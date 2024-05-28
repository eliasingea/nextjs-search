import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export const getSearch = async (query) => {
  const index = searchClient.initIndex("instant_search_ecommerce");
  console.log(query);
  let results = index.search(query);
  if (results.nbHits === 0) {
    return [];
  } else {
    return (await results).hits;
  }
};
