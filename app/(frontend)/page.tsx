import config from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

function formatDate(date?: string | null) {
  if (!date) return "undated";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function Home() {
  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    depth: 0,
    limit: 24,
    sort: "-publishedAt",
  });

  return (
    <main className="garden">
      <header className="masthead">
        <p className="eyebrow">[ DAGOBah.DIGITAL / FIELD NOTES ]</p>
        <div className="masthead-row">
          <h1>
            DAGOB<span>AH</span>
            <br />
            DIGITAL GARDEN
          </h1>
          <p className="issue-mark">
            SYSTEM / 01
            <br />
            OPEN ARCHIVE
          </p>
        </div>
        <p className="subhead">A small collection of notes, fragments, and things worth returning to.</p>
      </header>

      <section className="archive" aria-labelledby="archive-heading">
        <div className="archive-title">
          <div>
            <p className="eyebrow">{String(posts.length).padStart(2, "0")} ENTRIES INDEXED</p>
            <h2 id="archive-heading">POST ARCHIVE</h2>
          </div>
          <span className="status">● LIVE</span>
        </div>

        {posts.length > 0 ? (
          <div className="post-grid">
            {posts.map((post, index) => (
              <article className="post-card" key={post.id}>
                <div className="card-meta">
                  <span>#{String(index + 1).padStart(2, "0")}</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt || post.content}</p>
                <footer>
                  <span>{post.slug}</span>
                  <span aria-hidden="true">↗</span>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-marker">□</span>
            <p>NO POSTS RECORDED YET.</p>
            <Link href="/admin/collections/posts/create">ADD THE FIRST ENTRY ↗</Link>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} DAGOBah.DIGITAL</span>
        <span>MADE FOR SLOW READING</span>
        <span>✳ ARCHIVE ONLINE</span>
      </footer>
    </main>
  );
}
