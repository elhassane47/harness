import http from "../http-common";

class JobsDataService {
  getAll() {
    return http.get("/jobs/");
  }

  get(id) {
    return http.get(`/jobs/${id}/`);
  }

  create(data) {
    return http.post("/jobs/", data);
  }

  update(id, data) {
    return http.put(`/jobs/${id}/`, data);
  }

  delete(id) {
    return http.delete(`/jobs/${id}`);
  }

}
export default new JobsDataService();
