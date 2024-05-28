import { getSearch } from "./lib/getSearch";

const Search = async ({ searchParams }) => {
  const searchQuery =
    typeof searchParams.q === "string" ? searchParams.q : undefined;

  const results = await getSearch(searchQuery);

  console.log(results);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12">
      <h1>Hey this is search page - {searchParams.q}</h1>
      <div>
        <ul>
          {results.map((res) => (
            <li key={res.objectID}>{res.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
