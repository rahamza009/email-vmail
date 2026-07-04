"use client";

import Script from "next/script";

export default function TacticalMerchandise() {
  return (
    <main style={{ backgroundColor: "#2D3A28" }} className="min-h-screen pt-32 pb-24 px-6">
      {/* ConvertKit script */}
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />

      {/* Hero copy */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1
          className="font-barlow text-5xl md:text-6xl font-black mb-6 leading-tight"
          style={{ color: "#F5C124" }}
        >
          Coming Soon....!
        </h1>
        <p className="font-inter text-lg md:text-xl text-white/75 leading-relaxed">
          A curated marketplace of tactical gear and ammunition — sourced from verified brands, ready for dealers and retailers to stock their stores.
        </p>
      </div>

      {/* ConvertKit form */}
      <div className="flex justify-center">
        <div
          dangerouslySetInnerHTML={{
            __html: `<form action="https://app.kit.com/forms/9644614/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="9644614" data-uid="ec27833465" data-format="modal" data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700 800" style="background-color: rgb(255, 255, 255); border-radius: 6px;"><div data-style="full"><div data-element="column" class="formkit-column" style="background-color: rgb(249, 250, 251);"><div class="formkit-background" style="opacity: 0.38;"></div><div class="formkit-header" data-element="header" style="color: rgb(44, 51, 32); font-size: 20px; font-weight: 700;"><h2>Join Wish List</h2></div><div class="formkit-subheader" data-element="subheader" style="color: rgb(5, 5, 5); font-size: 15px;"><p>Be the first to know when new brands and products go live.</p></div><div class="formkit-image formkit-image relative focus:outline-none" role="button" tabindex="0"><img class="cursor-pointer focus:outline-blue " src="https://embed.filekitcdn.com/e/mAAzwxyXT4uYx4N3xDztD7/jgj5ngNMqPhwtmA6ZY1W6L" style="max-width: 100%;"></div></div><div data-element="column" class="formkit-column"><ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul><div data-element="fields" class="seva-fields formkit-fields"><div class="formkit-field"><input class="formkit-input" name="fields[undefined]" required="" type="text" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;"></div><div class="formkit-field"><input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;"></div><div class="formkit-field"><input class="formkit-input" name="fields[undefined]" required="" type="text" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;"></div><button data-element="submit" class="formkit-submit formkit-submit" style="color: rgb(255, 255, 255); background-color: rgb(44, 51, 32); border-radius: 24px; font-weight: 700;"><div class="formkit-spinner"><div></div><div></div><div></div></div><span class="">Join Wish List</span></button></div><div class="formkit-guarantee" data-element="guarantee" style="color: rgb(77, 77, 77); font-size: 13px; font-weight: 400;"><p>We respect your privacy. Unsubscribe at any time.</p></div><div class="formkit-powered-by-convertkit-container"><a href="https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic" data-element="powered-by" class="formkit-powered-by-convertkit" data-variant="dark" target="_blank" rel="nofollow noopener">Built with Kit</a></div></div></div></form>`,
          }}
        />
      </div>
    </main>
  );
}
