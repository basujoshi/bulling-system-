/* Billing Multi-User layer. Firebase v8 compatible. */
(function(){
  if (!window.firebase) return;
  if (!firebase.apps.length) firebase.initializeApp(window.BILLING_FIREBASE_CONFIG || {});
  const auth = firebase.auth();
  const rawDb = firebase.database();
  window.BillingAuth = auth;
  window.BillingRawDB = rawDb;

  window.getBillingUID = function(){
    const u = auth.currentUser;
    if (!u) throw new Error('Please login first.');
    return u.uid;
  };
  window.billingPath = function(path){
    const uid = getBillingUID();
    path = (path || '').replace(/^\/+|\/+$/g,'');
    return path ? `users/${uid}/${path}` : `users/${uid}`;
  };
  window.scopedDatabase = function(){
    return {
      ref: function(path){ return rawDb.ref(billingPath(path)); },
      goOffline: rawDb.goOffline.bind(rawDb),
      goOnline: rawDb.goOnline.bind(rawDb),
      purgeOutstandingWrites: rawDb.purgeOutstandingWrites.bind(rawDb)
    };
  };
  window.requireBillingAuth = function(){
    return new Promise(function(resolve){
      const off = auth.onAuthStateChanged(function(user){
        off();
        if (!user) { location.replace('index.html'); return; }
        window.BILLING_USER = user;
        resolve(user);
      });
    });
  };
})();
