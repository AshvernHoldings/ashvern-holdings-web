import Image from "next/image";
import ContactForm from "./contact-form";
import SealArc from "./seal-arc";
import NavScroll from "./nav-scroll";
import towerFacade from "../public/img/tower-facade.webp";
import skylineHero from "../public/img/skyline-hero.jpg";

const IR_EMAIL = "investing@ashvernholdings.com";

export default function Home() {
  return (
    <main>
      <NavScroll />
      <nav className="site-nav" aria-label="Primary">
        <a className="wordmark" href="#hero-title">
          Ashvern Holdings
        </a>
        <div className="links">
          <a href="#purpose-title">About</a>
          <a href="#subs-title">Subsidiaries</a>
          <a href="#ir-title">Investor Relations</a>
          <a href="#contact-title">Contact</a>
        </div>
        <div className="links links--mobile-only">
          <a href="#contact-title">Contact</a>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <Image
          src={skylineHero}
          alt="San Francisco skyline at sunset, seen from a hillside overlook, the Transamerica Pyramid at center"
          fill
          sizes="100vw"
          priority
          className="hero-image"
        />
        <SealArc size="large" corner="top-right" />
        <div className="hero-content">
          <p className="eyebrow">Holding Company &middot; Georgia</p>
          <h1 id="hero-title">Ashvern Holdings, Inc.</h1>
          <p className="lede measure">
            Ashvern Holdings, Inc. is a privately held Georgia corporation that
            owns and oversees equity interests in a group of operating
            subsidiaries. It does not sell products or services itself; its work is
            ownership, governance, and the long-term direction of the companies it
            holds.
          </p>
        </div>
      </section>

      <section className="section section--photo reveal" aria-labelledby="purpose-title">
        <Image
          src={towerFacade}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="section-bg"
        />
        <SealArc size="small" corner="bottom-right" />
        <div className="shell section-content">
          <p className="eyebrow">Purpose</p>
          <h2 id="purpose-title">Why the company exists</h2>
          <div className="measure" style={{ marginTop: "1.4rem" }}>
            <p>
              The company&rsquo;s purpose is stated in Article VII of its Articles
              of Incorporation:
            </p>
            <blockquote>
              <p>
                &ldquo;The Corporation is organized to acquire, hold, and manage
                equity interests in subsidiary companies, and to engage in any
                lawful act or activity for which corporations may be organized
                under the Georgia Business Corporation Code.&rdquo;
              </p>
              <span className="cite">
                Articles of Incorporation of Ashvern Holdings, Inc., Article VII
              </span>
            </blockquote>
            <p>
              In practice, Ashvern Holdings, Inc. holds the ownership stake in each
              subsidiary and sets policy at the parent level &mdash; how the group
              is governed, how capital is allocated, and which businesses it takes
              on. Each subsidiary keeps its own management and runs its own
              operations. New subsidiaries are formed or acquired only when they
              fit that structure.
            </p>
          </div>
        </div>
      </section>

      <section className="section reveal" aria-labelledby="subs-title">
        <SealArc size="small" corner="top-left" />
        <div className="shell">
          <p className="eyebrow">Subsidiaries</p>
          <h2 id="subs-title">Companies held by Ashvern</h2>
          <p className="measure" style={{ marginTop: "1.4rem" }}>
            One company is currently planned as a subsidiary of Ashvern Holdings,
            Inc.
          </p>
          <div className="entry measure" style={{ marginTop: "1.5rem" }}>
            <div className="entry-head">
              <h3>Ridgepoint Dispatch</h3>
              <span className="status">In formation</span>
            </div>
            <p>
              A dispatch-services company planned as a wholly owned subsidiary of
              Ashvern Holdings, Inc. It has not yet been separately incorporated
              and is not operating. This section will be updated once its formation
              is complete.
            </p>
          </div>
        </div>
      </section>

      <section className="section reveal" aria-labelledby="ir-title">
        <SealArc size="small" corner="top-right" />
        <div className="shell">
          <p className="eyebrow">Investor Relations</p>
          <h2 id="ir-title">Information for investors</h2>
          <div className="measure" style={{ marginTop: "1.4rem" }}>
            <p>
              Ashvern Holdings, Inc. is a privately held company. Nothing on this
              website is an offer to sell, or a solicitation of an offer to buy,
              any security, and no investment is being offered here.
            </p>
            <p>
              Investors who wish to reach the company may write to{" "}
              <a href={`mailto:${IR_EMAIL}`}>{IR_EMAIL}</a>. Correspondence
              is read and answered directly.
            </p>
          </div>
        </div>
      </section>

      <section className="section reveal" aria-labelledby="contact-title">
        <SealArc size="small" corner="bottom-left" />
        <div className="shell">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Get in touch</h2>
          <p className="measure" style={{ marginTop: "1.4rem" }}>
            General correspondence can be sent with the form below, or by mail to
            the address in the footer.
          </p>
          <div className="measure" style={{ marginTop: "1.75rem" }}>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer>
        <SealArc size="small" corner="bottom-right" />
        <div className="shell">
          <p className="name">Ashvern Holdings, Inc.</p>
          <p>Incorporated in the State of Georgia.</p>
          <p>2330 Scenic Hwy S, Snellville, GA 30078</p>
          <p style={{ marginTop: "0.9rem" }}>
            &copy; {new Date().getFullYear()} Ashvern Holdings, Inc. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
