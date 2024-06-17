import algoliasearch from "algoliasearch/lite";
import algoliasearchHelper from "algoliasearch-helper";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

var helper = algoliasearchHelper(searchClient, "instant_search_ecommerce", {
  disjunctiveFacets: ["brand", "categories"],
});

async function getResults() {
  const promise = new Promise((resolve, reject) => {
    helper.on("result", function (event) {
      console.log("search results found");
      resolve(event.results);
    });
    helper.on("error", function (event) {
      console.log("Error in search");
      reject(event.error);
    });
  });
  return promise;
}

export const getSearch = async (searchParams) => {
  // const index = searchClient.initIndex("instant_search_ecommerce");

  let query = typeof searchParams.q === "string" ? searchParams.q : undefined;
  let facets = delete searchParams.q;
  console.log(searchParams);
  for (let [facet, value] of Object.entries(searchParams)) {
    console.log(typeof value);
    if (typeof value !== "string") {
      for (let val of value) {
        helper.addDisjunctiveFacetRefinement(facet, val);
      }
    } else {
      helper.addDisjunctiveFacetRefinement(facet, value);
    }
  }
  helper.setQuery(query);
  helper.search();
  let results = null;
  await getResults().then((res) => {
    console.log(res.params);
    results = res;
  });
  return results;
};
