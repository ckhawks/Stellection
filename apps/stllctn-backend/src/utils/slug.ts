import Hashids from 'hashids';
import { NumberLike } from 'hashids/cjs/util';

const hashids = new Hashids('stellection.com', 5); // provide a global salt for hashids

//// SLUGS table
// slug_id = 1,2,3,4,5,...
// dest_type = cluster/star
// 

// dest_url_path is the url of the item without the application url i.e. stellection.com
// ex. dest_url_path = "tags/5"
export function convertSlugIdToSlug(slug_id: number): string {
  return hashids.encode(slug_id);
} 

export function convertSlugToSlugId(slug: string): number {
  return parseInt(hashids.decode(slug)[0].toString(), 10);
}

export function testHashids(): void {
  console.log(convertSlugIdToSlug(1));
  console.log(convertSlugIdToSlug(5));
  console.log(convertSlugIdToSlug(1000));
  console.log(convertSlugIdToSlug(100000));
  console.log(convertSlugIdToSlug(1000000000000000));
  console.log(convertSlugToSlugId(convertSlugIdToSlug(1)));
  console.log(convertSlugToSlugId(convertSlugIdToSlug(5)));
  console.log(convertSlugToSlugId(convertSlugIdToSlug(1000)));
  console.log(convertSlugToSlugId(convertSlugIdToSlug(100000)));
  console.log(convertSlugToSlugId(convertSlugIdToSlug(5)));
}

export function getDestinationFromSlug(slug: string): string {
  let slug_id = convertSlugToSlugId(slug);
  
  return "";
}


