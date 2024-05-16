const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			persons: {},
			planets: [],
			planet: '',
			person: '',
			staship: '',
			currentPlanet: null,
			currentPerson: '',
			currentStarship: null,
			apiContact: 'https://playground.4geeks.com/contact/agendas/',
			favorites: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend					
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.text()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getPlanets: async () => {
				const response = await fetch('https://swapi.dev/api/planets')

				console.log(response);
				if (!response.ok) {

					console.log('Error ');
					return;
				};
				const data = await response.json()
				console.log('Planets: ', data);
				setStore({ planets: data });

			},
			settingPlanet: (planet) => { setStore({ currentPlanet: planet }) },

			getPersons: async () => {

				const response = await fetch('https://swapi.dev/api/people')
				console.log(response);
				if (!response.ok) {

					console.log('Error ', response.status, response.statusText);
					return;
				};
				const data = await response.json()
				console.log('Persons: ', data);
				setStore({ persons: data.results })

			},
			settingPerson: (person) => { setStore({ currentPerson: person }) },

			getStarships: async () => {
				const response = await fetch('https://www.swapi.tech/api/starships')
				console.log(response);
				if (!response.ok) {

					console.log('Error ', response.status, response.statusText);
					return;
				};
				const data = await response.json()
				console.log('vehicles: ', data);
				setStore({ starships: data.results })
			},
			settingStarship: (starship) => { setStore({ currentStarship: starship }) },

			getContacts: async () => {

			},
			handleAddFavorites: (item) => {
				const store = getStore();
				const favorites = store.favorites;
				const isFavorite = favorites.some(favorite => favorite === item.name);
				if (!isFavorite) {
					setStore({ favorites: [...favorites, item.name] });
				}
			},

			removeFavorite: (index) => {
				const store = getStore();
				const favorites = store.favorites;
				const newFavorites = favorites.filter((_, i) => i !== index)
				setStore({favorites: newFavorites})
			},

			clearFavorites: () => {
				setStore({favorites: []})
			}

		}

	}
};


export default getState;
