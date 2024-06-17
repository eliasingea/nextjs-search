import Image from "next/image";
import { getSearch } from "./lib/getSearch";
import { Facet } from "../components/Facet";

const Search = async ({ searchParams }) => {
  const results = await getSearch(searchParams);
  const facets = results.disjunctiveFacets;
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12">
      <h1 className="text-3xl font-bold mb-8">{searchParams.q}</h1>
      <div className="flex w-full">
        <h1>Number of Results: {results.nbHits}</h1>
        <div className="w-1/3">
          <Facet facets={facets} />
        </div>
        <div className="w-2/3">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.hits.map((res) => (
              <li
                key={res.objectID}
                className="bg-white shadow-md p-4 rounded-md"
              >
                <h2 className="text-l font-semibold p-4">{res.name}</h2>
                <div className="flex items-center ">
                  <span className="text-gray-500">Rating: {res.rating}</span>
                  <span className="text-gray-500 ml-4">Price: {res.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
