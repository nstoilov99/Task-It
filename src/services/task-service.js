const postService = {
    load: function (id) {
      return fetch(`http://localhost:9999/api/task${id ? `/${id}` : ''}`).then(res => res.json());
    },
    delete: function (id) {
        return fetch(`http://localhost:9999/api/task/${id}`,{
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json());
    },
    create: function(data) {
      return fetch(`http://localhost:9999/api/task/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      }).then(res => res.json());
    }
  };
  
  export default postService;