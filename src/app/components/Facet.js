"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";

export function Facet(props) {
  let facets = props.facets;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.append(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleCheckboxChange = (event) => {
    const { name, checked, value } = event.target;
    console.log(checked);
    if (checked)
      router.push(`${pathname}` + `?${createQueryString(name, value)}`);
    else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name, value);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  console.log(facets);
  return (
    <div>
      {facets.map((facet) => {
        return (
          <ul key={facet.name}>
            <h1 className="font-bold pb-3">{facet.name}</h1>
            {Object.entries(facet.data).map(([key, val]) => {
              return (
                <li key={key} className="list-none">
                  <label>
                    <input
                      type="checkbox"
                      name={facet.name}
                      value={key}
                      onChange={handleCheckboxChange}
                    />
                    {key} ({val})
                  </label>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );

  /*
    TODO: currently just appends and makes no checks to see if it already exists
  */
  // const createQueryString = useCallback(
  //   (name, value) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     console.log(params.getAll("brand"));
  //     params.append(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  // const handleCheckboxChange = (event) => {
  //   const { name, checked, value } = event.target;
  //   router.push(`${pathname}` + `?${createQueryString(name, value)}`);
  // };

  // return (
  //   <div>
  //     {facets.map((facet) => {
  //       return (
  //         <div key={facet}>
  //           <ul className="p-3">
  //             <h1 className="font-bold pb-1">{facet}</h1>
  //             {Object.entries(results.facets[facet]).map(([label, val]) => {
  //               return (
  //                 <li key={label} className="list-none">
  //                   <label>
  //                     <input
  //                       type="checkbox"
  //                       name={facet}
  //                       value={label}
  //                       onChange={handleCheckboxChange}
  //                     />
  //                     {label} ({val})
  //                   </label>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
}
