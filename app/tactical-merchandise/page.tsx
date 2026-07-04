"use client";

import Script from "next/script";

const CK_FORM = `
<form action="https://app.kit.com/forms/9644614/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="9644614" data-uid="ec27833465" data-format="inline" data-version="5" min-width="400 500 600 700 800" style="background-color:rgb(255,255,255);border-radius:6px;">
  <div data-style="full">
    <div data-element="column" class="formkit-column" style="background-color:rgb(249,250,251);">
      <div class="formkit-header" data-element="header" style="color:rgb(44,51,32);font-size:20px;font-weight:700;"><h2>Join Wish List</h2></div>
      <div class="formkit-subheader" data-element="subheader" style="color:rgb(5,5,5);font-size:15px;"><p>Be the first to know when new brands and products go live.</p></div>
      <div class="formkit-image formkit-image relative focus:outline-none" role="button" tabindex="0">
        <img class="cursor-pointer" src="https://embed.filekitcdn.com/e/mAAzwxyXT4uYx4N3xDztD7/jgj5ngNMqPhwtmA6ZY1W6L" style="max-width:100%;" alt="Tactical Merchandise" />
      </div>
    </div>
    <div data-element="column" class="formkit-column">
      <ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
      <div data-element="fields" class="seva-fields formkit-fields">
        <div class="formkit-field">
          <input class="formkit-input" name="fields[first_name]" placeholder="First Name" required="" type="text" style="color:rgb(0,0,0);border-color:rgb(227,227,227);border-radius:4px;font-weight:400;" />
        </div>
        <div class="formkit-field">
          <input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color:rgb(0,0,0);border-color:rgb(227,227,227);border-radius:4px;font-weight:400;" />
        </div>
        <div class="formkit-field">
          <input class="formkit-input" name="fields[company]" placeholder="Store / Business Name" required="" type="text" style="color:rgb(0,0,0);border-color:rgb(227,227,227);border-radius:4px;font-weight:400;" />
        </div>
        <button data-element="submit" class="formkit-submit" style="color:rgb(255,255,255);background-color:rgb(44,51,32);border-radius:24px;font-weight:700;width:100%;padding:12px 24px;border:none;cursor:pointer;font-size:15px;">
          <div class="formkit-spinner"><div></div><div></div><div></div></div>
          <span>Join Wish List</span>
        </button>
      </div>
      <div class="formkit-guarantee" style="color:rgb(77,77,77);font-size:13px;font-weight:400;margin-top:12px;"><p>We respect your privacy. Unsubscribe at any time.</p></div>
    </div>
  </div>
  <style>
    .formkit-form[data-uid="ec27833465"] *{box-sizing:border-box;}
    .formkit-form[data-uid="ec27833465"] .formkit-input{background:#fff;font-size:15px;padding:12px;border:1px solid #e3e3e3;width:100%;line-height:1.4;margin:0 0 15px 0;border-radius:4px;}
    .formkit-form[data-uid="ec27833465"] .formkit-input:focus{outline:none;border-color:#2D3A28;}
    .formkit-form[data-uid="ec27833465"] .formkit-column{padding:20px;}
    .formkit-form[data-uid="ec27833465"] .formkit-header{margin:0 0 20px 0;}
    .formkit-form[data-uid="ec27833465"] .formkit-subheader{margin:0 0 15px 0;}
    .formkit-form[data-uid="ec27833465"] .formkit-alert{background:#f9fafb;border:1px solid #e3e3e3;border-radius:5px;list-style:none;margin:0 0 15px 0;padding:12px;text-align:center;}
    .formkit-form[data-uid="ec27833465"] .formkit-alert-error{background:#fde8e2;border-color:#f2643b;color:#ea4110;}
    .formkit-form[data-uid="ec27833465"] .formkit-spinner{display:none;}
    .formkit-form[data-uid="ec27833465"] [data-style="full"]{display:block;width:100%;}
    @media(min-width:600px){
      .formkit-form[data-uid="ec27833465"] [data-style="full"]{display:grid;grid-template-columns:1fr 1fr;}
      .formkit-form[data-uid="ec27833465"] .formkit-column{padding:40px;}
    }
  </style>
</form>
`;

export default function TacticalMerchandise() {
  return (
    <main className="min-h-screen bg-white">
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center" style={{ backgroundColor: "#2D3A28" }}>
        <p
          className="font-barlow text-xs font-bold tracking-[0.25em] uppercase px-4 py-2 rounded-full inline-block mb-6"
          style={{ color: "#F5C124", backgroundColor: "rgba(245,193,36,0.15)", border: "1px solid rgba(245,193,36,0.3)" }}
        >
          New Vertical
        </p>
        <h1
          className="font-barlow text-4xl md:text-6xl font-black mb-6 leading-tight"
          style={{ color: "#F5C124" }}
        >
          Coming Soon....!
        </h1>
        <p className="font-inter text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
          A curated marketplace of tactical gear and ammunition — sourced from verified brands, ready for dealers and retailers to stock their stores.
        </p>
      </section>

      {/* Form section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="font-barlow text-3xl font-black mb-3"
              style={{ color: "#2D3A28" }}
            >
              Get Early Access
            </h2>
            <p className="font-inter text-base" style={{ color: "rgba(45,58,40,0.65)" }}>
              Join the wishlist and be first in line when the marketplace opens.
            </p>
          </div>

          <div
            className="rounded-2xl overflow-hidden shadow-lg border"
            style={{ borderColor: "rgba(45,58,40,0.12)" }}
            dangerouslySetInnerHTML={{ __html: CK_FORM }}
          />
        </div>
      </section>
    </main>
  );
}
