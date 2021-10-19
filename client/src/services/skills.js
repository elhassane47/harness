import http from "../http-common";

class SkillsDataService {
  getAll() {
    return http.get("/skills");
  }

  get(id) {
    return http.get(`/skills/${id}/`);
  }

  create(data) {
    return http.post("/skills/", data);
  }

  update(id, data) {
    return http.put(`/skills/${id}/`, data);
  }

  delete(id) {
    return http.delete(`/skills/${id}`);
  }

  top_skills(){
      return http.get(`/skills/top_skills`);
  }

}
export default new SkillsDataService();
