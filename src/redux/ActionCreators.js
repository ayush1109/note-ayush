import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchNotes = () => (dispatch) => {
    dispatch(notesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'notes', {
        headers: {
            'Authorization': bearer
        },
    })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(notes => dispatch(addNotes(notes)))
            .catch(error => dispatch(notesFailed(error.message)));
}

export const notesLoading = () => ({
    type: ActionTypes.NOTES_LOADING
});

export const notesFailed = (errmess) => ({
    type: ActionTypes.NOTES_FAILED,
    payload: errmess
})

export const addNotes = (notes) => ({
    type: ActionTypes.ADD_NOTES,
    payload: notes
})

export const addNote = (note) => ({
    type: ActionTypes.ADD_NOTE,
    payload: note
})


export const postNote = (note) => (dispatch) => {

    const  newNote = {
        name: note
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'notes', {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addNote(response)))
    .catch(error => {console.log('Post Note ' + error.message)
            alert('Your Note could not be posted\n Error: ' + error.message)})
}

export const deleteNote = (noteId) => () => {
    
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'notes/' + noteId, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => console.log('note deleted ' + response))
    .catch(error => {console.log('Delete Note ' + error.message)
    alert('Your Note could not be deleted\n Error: ' + error.message)})
}

export const putNote = (note, noteId) => (dispatch) => {
    const  newNote = {
        name: note
    }
    console.log(newNote)
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'notes/' + noteId, {
        method: 'PUT',
        body: JSON.stringify(newNote),
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(editNote(response)))
    .catch(error => dispatch(editFailed(error)));
}

export const editNote = (note) => ({
    type: ActionTypes.EDIT_NOTE,
    payload: note
})

export const editFailed = (error) => ({
    type: ActionTypes.EDIT_FAILED,
    payload: error
})

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: message
    }
}

export const loginUser = (creds) => (dispatch) => {
    console.log(JSON.stringify(creds))
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchNotes());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}