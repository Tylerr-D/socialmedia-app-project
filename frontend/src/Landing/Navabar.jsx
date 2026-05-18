export function CTA(){
    const [joined, setJoined] = useState(false);
    return (
      <>
        <div className="cta-section">
          <h2 className="cta-title">
            Ready to <em>gather</em>
            <br />
            your people?
          </h2>
          <p className="cta-sub">
            Join over 2 million thoughtful people who chose depth over
            distraction. Always free, always ad-free.
          </p>
          {joined ? (
            <p
              style={{
                color: "#C4892A",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "1.1rem",
              }}
            >
              ✦ You're on the list. We'll be in touch soon.
            </p>
          ) : (
            <div className="email-row">
              <input
                className="email-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && email && setJoined(true)}
              />
              <button
                className="btn-primary"
                onClick={() => email && setJoined(true)}
              >
                Get early access
              </button>
            </div>
          )}
        </div>
      </>
    );
}