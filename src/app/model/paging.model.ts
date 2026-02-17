export class Paging {
  page = 1;
  size = 10;

  constructor(page?: number, size?: number) {
    if (page) {
      this.page = page;
    }
    if (size) {
      this.size = size;
    }
  }
}
