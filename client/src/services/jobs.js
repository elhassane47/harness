import http from "../http-common";

class JobsDataService {
  getAll() {
    return http.get("/jobs");
  }

  get(slug) {
    return http.get(`/jobs/${slug}/`);
  }

  create(data) {
    return http.post("/jobs/", data);
  }

  update(slug, data) {
    return http.put(`/jobs/${slug}/`, data);
  }

  delete(slug) {
    return http.delete(`/jobs/${slug}`);
  }

}
export default new JobsDataService();
