document.addEventListener('DOMContentLoaded', function () {
    const factSelector = document.getElementById('factSelector');
    const stateSelector = document.getElementById('stateSelector');
    const stateInfo = document.getElementById('stateInfo');
    const statesList = document.getElementById('statesList');
    const submitButton = document.getElementById('submitState');
    const funFactManager = document.getElementById('funFactManager');
    const newFunFactInput = document.getElementById('newFunFact');
    const addFunFactButton = document.getElementById('addFunFact');
    const currentFunFacts = document.getElementById('currentFunFacts');

    fetch('/states').then(response => response.json()).then(data => {
        data.forEach(state => {
            const option = document.createElement('option');
            option.value = state.code;
            option.textContent = `${state.state} (${state.code})`;
            stateSelector.appendChild(option);
        });
    }).catch(error => console.error('Error fetching states:', error));

    factSelector.addEventListener('change', function () {
        const isEditingFunFacts = this.value === "editFunFacts";
        funFactManager.style.display = isEditingFunFacts ? "block" : "none";
        stateSelector.disabled = ["", "contiguous", "noncontiguous", "editFunFacts"].includes(this.value);
        submitButton.disabled = ["", "contiguous", "noncontiguous"].includes(this.value);
    
        clearDisplay(); 
    
        if (this.value === "") { 
            fetchAllStates();
        } else if (this.value === "contiguous") {
            fetchStatesByContiguity(true);
        } else if (this.value === "noncontiguous") {
            fetchStatesByContiguity(false);
        } else {
            
            submitButton.disabled = false;
        }
    });    

    submitButton.addEventListener('click', function () {
        const factSelection = factSelector.value;
        const selectedStateCode = stateSelector.value;

        if (factSelection === "" && selectedStateCode === "") {
            fetchAllStates();
            return;
        }

        if (selectedStateCode === "") {
            stateInfo.innerHTML = '<p>Please select only one state.</p>';
            return;
        }

        let url = `/states/${selectedStateCode}`;
        if (factSelection !== "one" && factSelection !== "") {
            url += `/${factSelection}`;
        }

        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (factSelection === "one") {
                stateInfo.innerHTML = formatStateHtml(data);
            } else {
                let key = Object.keys(data)[0];
                stateInfo.innerHTML = `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</strong> ${data[key]}</p>`;
            }
        })
        .catch(error => console.error('Error fetching state details or fact:', error));
    });

    fetchAllStates();

    function clearDisplay() {
        stateInfo.innerHTML = '';
        statesList.innerHTML = '';
    }

    function fetchAllStates() {
        fetch('/states')
        .then(response => response.json())
        .then(data => populateAllStates(data))
        .catch(error => console.error('Error fetching states:', error));
    }

    function fetchStatesByContiguity(isContiguous) {
        let query = isContiguous ? "true" : "false";
        fetch(`/states/?contig=${query}`)
        .then(response => response.json())
        .then(data => populateAllStates(data))
        .catch(error => console.error('Error fetching states:', error));
    }    

    function populateAllStates(data) {
        statesList.innerHTML = ''; 
        data.forEach(state => {
            const element = document.createElement('div');
            element.className = 'state-info';
            element.innerHTML = formatStateHtml(state);
            statesList.appendChild(element);
        });
    }

    function formatStateHtml(state) {
        return `
            <h2>${state.state} (${state.code})</h2>
            <p><strong>Nickname:</strong> ${state.nickname}</p>
            <p><strong>Website:</strong> <a href="${state.website}" target="_blank">${state.website}</a></p>
            <p><strong>Admission Date:</strong> ${state.admission_date}</p>
            <p><strong>Admission Number:</strong> ${state.admission_number}</p>
            <p><strong>Capital City:</strong> ${state.capital_city} - <a href="${state.capital_url}" target="_blank">Visit</a></p>
            <p><strong>Population:</strong> ${state.population.toLocaleString()}</p>
            <p><strong>Population Rank:</strong> ${state.population_rank}</p>
            <p><strong>Constitution Url:</strong> ${state.constitution_url}</p>
            <p><strong>State Flag Url:</strong> ${state.state_flag_url}</p>
            <p><strong>State Seal Url:</strong> ${state.state_seal_url}</p>
            <p><strong>Map Image Url:</strong> ${state.map_image_url}</p>
            <p><strong>Landscape Background Url:</strong> ${state.landscape_background_url}</p>
            <p><strong>Skyline Background Url:</strong> ${state.skyline_background_url}</p>
            <p><strong>Twitter Url:</strong> ${state.twitter_url}</p>
            <p><strong>Facebook Url:</strong> ${state.facebook_url}</p>
            <p><strong>Fun Facts:</strong> <ul>${state.funfacts.map(funfact => `<li>${funfact}</li>`).join('')}</ul></p>
        `;
    }
});
    