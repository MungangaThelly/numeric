const allowedCycles=new Set(['primary','cteb','humanities','other']);
const clean=(value,max)=>String(value||'').trim().slice(0,max);

async function supabase(path,options={}){
  const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_ANON_KEY;
  if(!url||!key){const error=new Error('not_configured');error.status=503;throw error}
  return fetch(`${url.replace(/\/$/,'')}${path}`,{...options,headers:{apikey:key,'Content-Type':'application/json',...(options.headers||{})}});
}

async function userAndProfile(token){
  const auth=await supabase('/auth/v1/user',{headers:{Authorization:`Bearer ${token}`}});
  if(!auth.ok){const error=new Error('invalid_session');error.status=401;throw error}
  const user=await auth.json();
  const response=await supabase(`/rest/v1/teacher_profiles?user_id=eq.${encodeURIComponent(user.id)}&select=user_id,role,display_name,school_name,education_province,cycle,subjects`,{headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.pgrst.object+json'}});
  if(!response.ok){const error=new Error('teacher_not_authorized');error.status=403;throw error}
  const profile=await response.json();
  return{user:{id:user.id,email:user.email},profile};
}

async function teacherRpc(name,token,body={}){
  const response=await supabase(`/rest/v1/rpc/${name}`,{method:'POST',headers:{Authorization:`Bearer ${token}`},body:JSON.stringify(body)});
  if(!response.ok){const error=new Error('admin_action_failed');error.status=response.status===401?401:403;throw error}
  return response.status===204?null:response.json();
}

module.exports=async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');
  try{
    if(req.method==='GET'){
      const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
      if(!token)return res.status(401).json({error:'invalid_session'});
      return res.status(200).json(await userAndProfile(token));
    }
    if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});
    const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
    if(body.action==='magic-link'){
      const email=clean(body.email,254),redirectTo=clean(body.redirectTo,500);
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return res.status(400).json({error:'invalid_email'});
      const origin=(process.env.APP_ORIGIN||'https://mboka.nuhar.se').replace(/\/$/,''),safeRedirect=redirectTo.startsWith(`${origin}/`)||redirectTo===origin?redirectTo:`${origin}/`;
      // The invitation-only Before User Created hook is the authorization gate.
      // create_user must stay enabled so a first-time invited teacher can receive
      // the magic link and complete account creation.
      const response=await supabase('/auth/v1/otp',{method:'POST',body:JSON.stringify({email,create_user:true,options:{email_redirect_to:safeRedirect}})});
      if(!response.ok&&![400,422].includes(response.status))throw Object.assign(new Error('auth_failed'),{status:response.status});
      return res.status(200).json({ok:true});
    }
    if(body.action==='profile'){
      const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,''),current=await userAndProfile(token),displayName=clean(body.display_name,80),school=clean(body.school_name,120),province=clean(body.education_province,80),cycle=clean(body.cycle,20),subjects=clean(body.subjects,160);
      if(!displayName||!school||!province||!allowedCycles.has(cycle))return res.status(400).json({error:'invalid_profile'});
      const response=await supabase(`/rest/v1/teacher_profiles?user_id=eq.${encodeURIComponent(current.user.id)}`,{method:'PATCH',headers:{Authorization:`Bearer ${token}`,Prefer:'return=representation'},body:JSON.stringify({display_name:displayName,school_name:school,education_province:province,cycle,subjects})});
      if(!response.ok)throw Object.assign(new Error('profile_failed'),{status:response.status});
      return res.status(200).json(await userAndProfile(token));
    }
    if(body.action==='list-invitations'){
      const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');
      if(!token)return res.status(401).json({error:'invalid_session'});
      return res.status(200).json({invitations:await teacherRpc('admin_list_teacher_invitations',token)});
    }
    if(body.action==='save-invitation'){
      const token=(req.headers.authorization||'').replace(/^Bearer\s+/i,''),email=clean(body.email,254).toLowerCase(),role=clean(body.role,20),active=body.active!==false;
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!['teacher','coordinator','admin'].includes(role))return res.status(400).json({error:'invalid_invitation'});
      await teacherRpc('admin_upsert_teacher_invitation',token,{invited_email:email,invited_role:role,invited_active:active});
      return res.status(200).json({ok:true});
    }
    return res.status(400).json({error:'invalid_action'});
  }catch(error){return res.status(error.status||500).json({error:error.message==='not_configured'?'not_configured':'request_failed'})}
};
