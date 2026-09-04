import Image from "next/image";
import ContactForm from "./contact-form";
import { Reveal, RevealItem } from "./reveal";
import cityHero from "../public/img/city-hero.webp";
import towerFacade from "../public/img/tower-facade.webp";

const IR_EMAIL = "investing@ashvernholdings.com";

export default function Home() {
  return (
    <main className="shell">
      <Reveal as="section" className="section" immediate>
        <RevealItem>
          <p className="eyebrow">Holding Company &middot; Georgia</p>
        </RevealItem>
        <RevealItem>
          <h1 id="hero-title">Ashvern Holdings, Inc.</h1>
        </RevealItem>
        <RevealItem>
          <p className="lede measure" style={{ marginTop: "1.6rem" }}>
            Ashvern Holdings, Inc. is a privately held Georgia corporation that
            owns and oversees equity interests in a group of operating
            subsidiaries. It does not sell products or services itself; its work is
            ownership, governance, and the long-term direction of the companies it
            holds.
          </p>
        </RevealItem>
        <RevealItem>
          <figure className="plate measure">
            <Image
              src={cityHero}
              alt="A city skyline at dusk, lit towers reflected in calm water"
              sizes="(max-width: 44rem) 100vw, 40rem"
              placeholder="blur"
              priority
            />
          </figure>
        </RevealItem>
      </Reveal>

      <Reveal as="section" className="section" aria-labelledby="purpose-title">
        <RevealItem>
          <p className="eyebrow">Purpose</p>
        </RevealItem>
        <RevealItem>
          <h2 id="purpose-title">
            Why the company <span className="accent-word">exists</span>
          </h2>
        </RevealItem>
        <RevealItem>
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
            <figure className="plate plate--quiet">
              <Image
                src={towerFacade}
                alt="Close-up of a glass-and-steel office tower facade"
                sizes="(max-width: 44rem) 100vw, 40rem"
                placeholder="blur"
              />
            </figure>
          </div>
        </RevealItem>
      </Reveal>

      <Reveal as="section" className="section" aria-labelledby="subs-title">
        <RevealItem>
          <p className="eyebrow">Subsidiaries</p>
        </RevealItem>
        <RevealItem>
          <h2 id="subs-title">
            Companies held by <span className="accent-word">Ashvern</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="measure" style={{ marginTop: "1.4rem" }}>
            One company is currently planned as a subsidiary of Ashvern Holdings,
            Inc.
          </p>
        </RevealItem>
        <RevealItem>
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
        </RevealItem>
      </Reveal>

      <Reveal as="section" className="section" aria-labelledby="ir-title">
        <RevealItem>
          <p className="eyebrow">Investor Relations</p>
        </RevealItem>
        <RevealItem>
          <h2 id="ir-title">
            Information for <span className="accent-word">investors</span>
          </h2>
        </RevealItem>
        <RevealItem>
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
        </RevealItem>
      </Reveal>

      <Reveal as="section" className="section" aria-labelledby="contact-title">
        <RevealItem>
          <p className="eyebrow">Contact</p>
        </RevealItem>
        <RevealItem>
          <h2 id="contact-title">
            Get in <span className="accent-word">touch</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="measure" style={{ marginTop: "1.4rem" }}>
            General correspondence can be sent with the form below, or by mail to
            the address in the footer.
          </p>
        </RevealItem>
        <RevealItem>
          <div className="measure" style={{ marginTop: "1.75rem" }}>
            <ContactForm />
          </div>
        </RevealItem>
      </Reveal>

      <footer>
        <p className="name">Ashvern Holdings, Inc.</p>
        <p>Incorporated in the State of Georgia.</p>
        <p>2330 Scenic Hwy S, Snellville, GA 30078</p>
        <p style={{ marginTop: "0.9rem" }}>
          &copy; {new Date().getFullYear()} Ashvern Holdings, Inc. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
