import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  // for URL Server rendering Search form
  const query = (await searchParams).query;

  // To revalidate data in live when a new post is created
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideia, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for ${query}` : "All startups"}
          </p>
          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (
              <p className="no-results">No startups found</p>
            )}
          </ul>
        </section>

        <SanityLive />
      </section>
    </>
  );
}
