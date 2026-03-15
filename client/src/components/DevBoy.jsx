import { useEffect, useRef } from 'react'

export default function DevBoy({ className = '' }) {
  return (
    <div className={`relative flex items-end justify-center ${className}`} style={{ width: '100%', minHeight: '420px' }}>
      <style>{`
        .devboy-scene { position:relative; width:340px; height:420px; margin:0 auto; }

        /* Orbs */
        .db-orb { position:absolute; border-radius:50%; filter:blur(36px); animation:dbOrbFloat 6s ease-in-out infinite; pointer-events:none; }
        .db-orb1 { width:130px;height:130px;background:rgba(0,245,255,0.1);  top:10px; left:-20px; animation-delay:0s; }
        .db-orb2 { width:100px;height:100px;background:rgba(157,78,221,0.12);bottom:40px;right:-10px;animation-delay:-2s;}
        .db-orb3 { width:70px; height:70px; background:rgba(255,0,110,0.08); top:160px;right:10px; animation-delay:-4s;}

        @keyframes dbOrbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(1.06)} }

        /* Float tags */
        .db-tag { position:absolute; font-family:'Fira Code',monospace; font-size:10px; padding:3px 8px; border-radius:4px;
          background:rgba(0,0,0,0.55); border:1px solid; backdrop-filter:blur(4px); white-space:nowrap;
          animation:dbTagFloat 4s ease-in-out infinite; pointer-events:none; z-index:10; }
        .db-tag1 { top:20px;  left:0px;  color:#00f5ff; border-color:rgba(0,245,255,0.3);  animation-delay:0s;   }
        .db-tag2 { top:80px;  right:0px; color:#9d4edd; border-color:rgba(157,78,221,0.3); animation-delay:-1.4s;}
        .db-tag3 { top:160px; left:5px;  color:#ff006e; border-color:rgba(255,0,110,0.3);  animation-delay:-2.7s;}
        .db-tag4 { top:50px;  right:5px; color:#68d391; border-color:rgba(104,211,145,0.3);animation-delay:-0.8s;}
        @keyframes dbTagFloat { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }

        /* Character */
        .db-character { position:absolute; bottom:112px; left:50%; transform:translateX(-50%);
          animation:dbBob 3s ease-in-out infinite; }
        @keyframes dbBob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }

        /* Head */
        .db-head-wrap { position:relative; width:80px; height:85px; margin:0 auto; }
        .db-head { width:80px;height:80px;background:linear-gradient(160deg,#f5c49e,#e8a870);
          border-radius:45% 45% 42% 42% / 48% 48% 40% 40%; position:relative; overflow:visible;
          box-shadow:0 4px 18px rgba(0,0,0,0.4); }

        /* Hair */
        .db-hair { position:absolute;top:-7px;left:-3px;right:-3px;height:44px;
          background:#1a0a00;border-radius:50% 50% 0 0 / 60% 60% 0 0;z-index:2;overflow:visible; }
        .db-hair::after { content:'';position:absolute;bottom:-10px;left:7px;right:7px;height:18px;
          background:#1a0a00;border-radius:0 0 50% 50%; }
        .db-spike { position:absolute;top:-15px;width:12px;height:20px;background:#1a0a00;border-radius:50% 50% 0 0; }
        .db-spike:nth-child(1){left:10px;transform:rotate(-20deg);}
        .db-spike:nth-child(2){left:24px;transform:rotate(-8deg);height:24px;}
        .db-spike:nth-child(3){left:37px;height:26px;}
        .db-spike:nth-child(4){left:50px;transform:rotate(8deg);height:22px;}
        .db-spike:nth-child(5){left:60px;transform:rotate(20deg);}

        /* Ears */
        .db-ear { position:absolute;top:32px;width:14px;height:18px;background:#e8a870;border-radius:50%; }
        .db-ear.l { left:-5px; } .db-ear.r { right:-5px; }

        /* Eyes */
        .db-eyes { position:absolute;top:30px;left:0;right:0;display:flex;justify-content:center;gap:14px;z-index:3; }
        .db-eye { width:13px;height:13px;background:white;border-radius:50%;position:relative;box-shadow:0 2px 4px rgba(0,0,0,0.3); }
        .db-pupil { width:7px;height:7px;background:#1a0a00;border-radius:50%;position:absolute;top:3px;left:3px;
          animation:dbLook 5s ease-in-out infinite; }
        @keyframes dbLook {
          0%,20%{transform:translate(0,0)} 30%{transform:translate(2px,-1px)}
          50%{transform:translate(2px,1px)} 70%{transform:translate(-2px,0)} 85%,100%{transform:translate(0,0)} }
        .db-eye::after { content:'';position:absolute;inset:0;background:#e8a870;border-radius:50%;
          transform:scaleY(0);animation:dbBlink 4s ease-in-out infinite; }
        @keyframes dbBlink { 0%,44%,48%,100%{transform:scaleY(0)} 46%{transform:scaleY(1)} }

        /* Glasses */
        .db-glasses { position:absolute;top:27px;left:50%;transform:translateX(-50%);z-index:4;pointer-events:none; }

        /* Mouth */
        .db-mouth { position:absolute;bottom:13px;left:50%;transform:translateX(-50%);
          width:20px;height:9px;border-bottom:2.5px solid #c0785a;border-radius:0 0 12px 12px;z-index:3; }

        /* Headphones */
        .db-phones { position:absolute;top:12px;left:50%;transform:translateX(-50%);z-index:5;pointer-events:none; }

        /* Neck */
        .db-neck { width:22px;height:16px;background:linear-gradient(180deg,#e8a870,#d4956a);margin:0 auto;border-radius:0 0 7px 7px; }

        /* Body */
        .db-body { width:100px;margin:0 auto;position:relative; }
        .db-hoodie { width:100px;height:90px;background:linear-gradient(160deg,#1e1e3a,#2a2a5a);
          border-radius:10px 10px 14px 14px;position:relative;overflow:hidden;
          box-shadow:0 8px 22px rgba(0,0,0,0.5); }
        .db-hoodie::after { content:'';position:absolute;bottom:10px;left:50%;transform:translateX(-50%);
          width:32px;height:20px;border:1.5px solid rgba(0,245,255,0.22);border-radius:7px; }
        .db-hoodie-logo { position:absolute;top:12px;left:50%;transform:translateX(-50%);
          font-family:'Fira Code',monospace;font-size:8px;color:rgba(0,245,255,0.7);font-weight:bold;letter-spacing:1px; }
        .db-string { position:absolute;top:0;width:2px;height:26px;background:rgba(0,245,255,0.28);border-radius:1px; }
        .db-string.l{left:38px;transform:rotate(8deg);} .db-string.r{right:38px;transform:rotate(-8deg);}

        /* Arms */
        .db-arms { position:absolute;top:12px;left:-18px;right:-18px;display:flex;justify-content:space-between; }
        .db-arm { width:20px;height:72px;background:linear-gradient(180deg,#1e1e3a,#2a2a5a);border-radius:10px;position:relative; }
        .db-hand { width:20px;height:18px;background:#e8a870;border-radius:50% 50% 40% 40%;position:absolute;bottom:-9px; }
        .db-arm.l { animation:dbTypeL 0.4s ease-in-out infinite alternate; transform-origin:top center; }
        .db-arm.r { animation:dbTypeR 0.4s ease-in-out infinite alternate 0.2s; transform-origin:top center; }
        @keyframes dbTypeL { from{transform:rotate(-4deg)} to{transform:rotate(4deg) translateY(3px)} }
        @keyframes dbTypeR { from{transform:rotate(4deg)}  to{transform:rotate(-4deg) translateY(3px)} }

        /* Legs */
        .db-legs { display:flex;justify-content:center;gap:8px;margin-top:-3px; }
        .db-leg { width:25px;height:48px;background:#12122a;border-radius:7px 7px 3px 3px;position:relative; }
        .db-shoe { position:absolute;bottom:-7px;left:-3px;width:31px;height:12px;
          background:#1a1a2e;border-radius:7px 12px 7px 7px;box-shadow:0 3px 7px rgba(0,0,0,0.4); }
        .db-shoe::after { content:'';position:absolute;top:2px;left:3px;right:7px;height:2px;
          background:rgba(0,245,255,0.28);border-radius:2px; }

        /* Desk */
        .db-desk-wrap { position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:320px; }
        .db-desk-top  { width:100%;height:16px;background:linear-gradient(180deg,#1e1240,#150e35);
          border-radius:7px 7px 0 0;border-top:1px solid rgba(0,245,255,0.13);
          box-shadow:0 -3px 18px rgba(0,245,255,0.07); }
        .db-desk-body { width:88%;height:52px;background:#0d0d1f;margin:0 auto;border-radius:0 0 7px 7px; }

        /* Monitor */
        .db-monitor-wrap { position:absolute;top:-178px;left:50%;transform:translateX(-50%); }
        .db-monitor { width:200px;height:132px;background:#080816;border:2px solid rgba(0,245,255,0.18);
          border-radius:9px;position:relative;overflow:hidden;
          box-shadow:0 0 26px rgba(0,245,255,0.1),inset 0 0 26px rgba(0,0,0,0.6); }
        .db-monitor::before { content:'';position:absolute;left:0;right:0;height:3px;
          background:rgba(0,245,255,0.07);animation:dbScan 3s linear infinite;z-index:2; }
        @keyframes dbScan { from{top:-3px} to{top:100%} }
        .db-monitor-stand { width:44px;height:12px;background:rgba(0,245,255,0.08);margin:0 auto;
          border-radius:0 0 4px 4px;border:1px solid rgba(0,245,255,0.1);border-top:none; }
        .db-monitor-base  { width:80px;height:7px;background:rgba(0,245,255,0.06);border-radius:4px;margin:0 auto;
          border:1px solid rgba(0,245,255,0.1); }

        /* Screen code */
        .db-screen { padding:8px 10px;height:100%;position:relative;z-index:1;overflow:hidden; }
        .db-line { font-family:'Fira Code',monospace;font-size:7px;margin-bottom:4px;white-space:nowrap;
          opacity:0;animation:dbCode 0.3s forwards; }
        .db-line:nth-child(1){animation-delay:0.0s;color:#9d4edd;}
        .db-line:nth-child(2){animation-delay:0.3s;color:#00f5ff;}
        .db-line:nth-child(3){animation-delay:0.6s;color:#e2e8f0;padding-left:10px;}
        .db-line:nth-child(4){animation-delay:0.9s;color:#00f5ff;padding-left:10px;}
        .db-line:nth-child(5){animation-delay:1.2s;color:#ff006e;padding-left:20px;}
        .db-line:nth-child(6){animation-delay:1.5s;color:#e2e8f0;padding-left:10px;}
        .db-line:nth-child(7){animation-delay:1.8s;color:#9d4edd;}
        .db-line:nth-child(8){animation-delay:2.1s;color:#68d391;}
        .db-line:nth-child(9){animation-delay:2.4s;color:#00f5ff;}
        .db-line:nth-child(10){animation-delay:2.7s;color:#ff006e;}
        .db-line:nth-child(11){animation-delay:3.0s;color:#9d4edd;}
        @keyframes dbCode { from{opacity:0;transform:translateX(-4px)} to{opacity:1;transform:translateX(0)} }
        .db-cursor { display:inline-block;width:5px;height:8px;background:#00f5ff;
          animation:dbBlink2 0.8s step-end infinite;vertical-align:middle;margin-left:2px; }
        @keyframes dbBlink2 { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Keyboard */
        .db-keyboard { position:absolute;top:8px;left:50%;transform:translateX(-50%);
          width:145px;height:44px;background:linear-gradient(180deg,#1a1a35,#12122a);
          border-radius:5px;border:1px solid rgba(0,245,255,0.1);
          display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(4,1fr);
          gap:2px;padding:3px;box-shadow:0 4px 10px rgba(0,0,0,0.4); }
        .db-key { background:#0d0d22;border-radius:2px;border:1px solid rgba(255,255,255,0.05); }
        .db-key.on { background:rgba(0,245,255,0.13);border-color:rgba(0,245,255,0.28);
          box-shadow:0 0 4px rgba(0,245,255,0.25);animation:dbKey 0.4s ease-in-out infinite alternate; }
        @keyframes dbKey { from{background:rgba(0,245,255,0.08)} to{background:rgba(0,245,255,0.2)} }
        .db-key.sp { grid-column:span 5; }

        /* Coffee */
        .db-coffee { position:absolute;top:-2px;right:32px;animation:dbWobble 4s ease-in-out infinite; }
        @keyframes dbWobble { 0%,100%{transform:rotate(0)} 25%{transform:rotate(2deg)} 75%{transform:rotate(-2deg)} }
        .db-mug { width:26px;height:25px;background:linear-gradient(160deg,#2a1a50,#1a1040);
          border-radius:3px 3px 7px 7px;border:1px solid rgba(157,78,221,0.28);position:relative;overflow:hidden; }
        .db-mug::after { content:'KV';position:absolute;bottom:3px;left:50%;transform:translateX(-50%);
          font-size:6px;color:rgba(0,245,255,0.6);font-family:'Fira Code',monospace;font-weight:bold; }
        .db-handle { position:absolute;right:-7px;top:5px;width:9px;height:12px;
          border:2px solid rgba(157,78,221,0.28);border-left:none;border-radius:0 5px 5px 0; }
        .db-steam { position:absolute;bottom:100%;left:50%;transform:translateX(-50%);display:flex;gap:3px; }
        .db-stm { width:2px;height:10px;background:linear-gradient(to top,rgba(157,78,221,0.45),transparent);
          border-radius:1px;animation:dbSteam 1.5s ease-in-out infinite; }
        .db-stm:nth-child(2){animation-delay:0.3s;height:14px;} .db-stm:nth-child(3){animation-delay:0.6s;}
        @keyframes dbSteam { 0%{transform:translateY(0) scaleX(1);opacity:0.65} 100%{transform:translateY(-12px) scaleX(0.3);opacity:0} }

        /* WiFi */
        .db-wifi { position:absolute;top:-18px;right:8px;animation:dbWifi 2s ease-in-out infinite; }
        @keyframes dbWifi { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>

      <div className="devboy-scene">
        {/* Glow orbs */}
        <div className="db-orb db-orb1" />
        <div className="db-orb db-orb2" />
        <div className="db-orb db-orb3" />

        {/* Floating tags */}
        <div className="db-tag db-tag1">&lt;MERN/&gt;</div>
        <div className="db-tag db-tag2">React ⚛</div>
        <div className="db-tag db-tag3">{'{ code }'}</div>
        <div className="db-tag db-tag4">Node.js</div>

        {/* ── Character ── */}
        <div className="db-character">
          {/* Head */}
          <div className="db-head-wrap">
            <div className="db-head">
              <div className="db-hair">
                <div className="db-spike" /><div className="db-spike" /><div className="db-spike" />
                <div className="db-spike" /><div className="db-spike" />
              </div>
              <div className="db-ear l" /><div className="db-ear r" />
              <div className="db-eyes">
                <div className="db-eye"><div className="db-pupil" /></div>
                <div className="db-eye"><div className="db-pupil" /></div>
              </div>
              {/* Glasses */}
              <div className="db-glasses">
                <svg width="68" height="26" viewBox="0 0 68 26" overflow="visible">
                  <rect x="1"  y="3" width="25" height="19" rx="9" fill="none" stroke="#00f5ff" strokeWidth="1.8" opacity="0.7"/>
                  <rect x="42" y="3" width="25" height="19" rx="9" fill="none" stroke="#00f5ff" strokeWidth="1.8" opacity="0.7"/>
                  <line x1="26" y1="12" x2="42" y2="12" stroke="#00f5ff" strokeWidth="1.4" opacity="0.55"/>
                  <line x1="1"  y1="9"  x2="-7" y2="7"  stroke="#00f5ff" strokeWidth="1.4" opacity="0.45"/>
                  <line x1="67" y1="9"  x2="75" y2="7"  stroke="#00f5ff" strokeWidth="1.4" opacity="0.45"/>
                  <rect x="2"  y="4" width="23" height="17" rx="8" fill="rgba(0,245,255,0.05)"/>
                  <rect x="43" y="4" width="23" height="17" rx="8" fill="rgba(0,245,255,0.05)"/>
                </svg>
              </div>
              <div className="db-mouth" />
            </div>

            {/* Headphones */}
            <div className="db-phones">
              <svg width="96" height="46" viewBox="0 0 96 46" overflow="visible">
                <path d="M9 27 Q48 -8 87 27" fill="none" stroke="#9d4edd" strokeWidth="3.5" strokeLinecap="round"/>
                <rect x="1" y="23" width="16" height="20" rx="8" fill="#1a0a35" stroke="#9d4edd" strokeWidth="1.4"/>
                <rect x="4" y="26" width="10" height="14" rx="5" fill="rgba(157,78,221,0.18)"/>
                <rect x="79" y="23" width="16" height="20" rx="8" fill="#1a0a35" stroke="#9d4edd" strokeWidth="1.4"/>
                <rect x="82" y="26" width="10" height="14" rx="5" fill="rgba(157,78,221,0.18)"/>
                <line x1="17" y1="38" x2="28" y2="44" stroke="#9d4edd" strokeWidth="1.8"/>
                <circle cx="28" cy="44" r="2.5" fill="#ff006e"/>
              </svg>
            </div>
          </div>

          {/* Neck */}
          <div className="db-neck" />

          {/* Body */}
          <div className="db-body">
            <div className="db-arms">
              <div className="db-arm l"><div className="db-hand" /></div>
              <div className="db-arm r"><div className="db-hand" /></div>
            </div>
            <div className="db-hoodie">
              <div className="db-hoodie-logo">&lt;KV/&gt;</div>
              <div className="db-string l" /><div className="db-string r" />
            </div>
            <div className="db-legs">
              <div className="db-leg"><div className="db-shoe" /></div>
              <div className="db-leg"><div className="db-shoe" /></div>
            </div>
          </div>
        </div>

        {/* ── Desk ── */}
        <div className="db-desk-wrap">
          <div style={{ position:'relative', width:'320px' }}>
            {/* Monitor */}
            <div className="db-monitor-wrap">
              <div className="db-wifi">
                <svg width="22" height="16" viewBox="0 0 22 16">
                  <path d="M2 5 Q11 -1 20 5"  fill="none" stroke="rgba(0,245,255,0.28)" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="M4 9 Q11 3 18 9"   fill="none" stroke="rgba(0,245,255,0.48)" strokeWidth="2.2" strokeLinecap="round"/>
                  <path d="M7 13 Q11 8 15 13" fill="none" stroke="rgba(0,245,255,0.68)" strokeWidth="2.2" strokeLinecap="round"/>
                  <circle cx="11" cy="15.5" r="1.8" fill="#00f5ff"/>
                </svg>
              </div>
              <div className="db-monitor">
                <div className="db-screen">
                  <div className="db-line">import React from 'react';</div>
                  <div className="db-line">const Dev = () =&gt; {'{'}</div>
                  <div className="db-line">  const name = "Keerthivasan";</div>
                  <div className="db-line">  const stack = [</div>
                  <div className="db-line">    "MERN","React","Node"</div>
                  <div className="db-line">  ];</div>
                  <div className="db-line">  return (</div>
                  <div className="db-line">    &lt;Portfolio /&gt;</div>
                  <div className="db-line">    &lt;Skills /&gt;</div>
                  <div className="db-line">    &lt;Contact /&gt;</div>
                  <div className="db-line">  );<span className="db-cursor" /></div>
                </div>
              </div>
              <div className="db-monitor-stand" />
              <div className="db-monitor-base" />
            </div>

            <div className="db-desk-top" />
            <div className="db-desk-body" />

            {/* Keyboard */}
            <div className="db-keyboard">
              {[1,0,1,0,1,0,1,0,0,1,0,1,
                0,1,0,1,0,0,1,0,1,0,1,0,
                0,1,0,0,1,0,0,1,0,1,0,1,
                0,'sp',0,1,0,0,1,0].map((k, i) =>
                <div key={i} className={`db-key${k==='sp'?' sp':k===1?' on':''}`} />
              )}
            </div>

            {/* Coffee */}
            <div className="db-coffee">
              <div className="db-steam">
                <div className="db-stm"/><div className="db-stm"/><div className="db-stm"/>
              </div>
              <div className="db-mug"><div className="db-handle"/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
