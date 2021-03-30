export default class Api {
    constructor(options) {
      this.url = options.url;
      this.headers = options.headers;

    }
  
    getInitialCards() {
        return fetch(this.url+'/cards', {
            headers: this.headers,
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка со статус-кодом ${res.status}`)
        })
    }

    getUserInfo() {
        return fetch(this.url+'/users/me', {
            headers: this.headers,
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка со статус-кодом ${res.status}`)
        })
    }
    
    getAllInfo() {
            return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    createCard(card) {
        return fetch(this.url+'/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
                currentId: card.currentId
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

  
return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
})
.catch(err => Promise.reject(err));
}

deleteCard(id) {
   this._id = id;
    return fetch(this.url+'/cards/'+ this._id, {
        method: 'DELETE',
        headers: this.headers,
        body: JSON.stringify({
            _id: this._id,
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }


return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
})
.catch(err => Promise.reject(err));
}

    editProfile(data) {
        return fetch(this.url+'/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
        })
        .catch(err => Promise.reject(err));
        }

        addLike(data) {
            return fetch(this.url+'/cards/likes/'+ data._id, {
                method: 'PUT',
                headers: this.headers,
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
        
        
        return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
        })
        .catch(err => Promise.reject(err));
        }

        removeLike(data) {
            return fetch(this.url+'/cards/likes/'+ data._id, {
                method: 'DELETE',
                headers: this.headers,
                body: JSON.stringify({
                    _id: data._id,
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
        
        
        return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
        })
        .catch(err => Promise.reject(err));
        }

        editAvatar(data) {
            return fetch(this.url+'/users/me/avatar', {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar: data.link,
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Произошла ошибка со статус-кодом ${res.status}`));
            })
            .catch(err => Promise.reject(err));
        }

}