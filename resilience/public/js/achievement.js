async function achievement() {
    let response = await fetch(`data/achievement.json`);
    const achievements = await response.json();
    let result = document.querySelector('#achievements');

    for (let i = 0; i < achievements.achievements.length; i++) {
        
        let achiev = achievements.achievements[i];
        let htmlAchiev = document.createElement('div');
        if (window.localStorage.getItem("achievement".concat(i + 1)) == "true") {
            htmlAchiev.classList.add('achievement');
            htmlAchiev.classList.add(`achievement-${achiev.ID}`);
            htmlAchiev.setAttribute('id', i + 1);
        } else {
            htmlAchiev.classList.add('achievement');
            htmlAchiev.classList.add(`achievement-any`);
            htmlAchiev.setAttribute('id', i + 1);
        }

        let htmlID = document.createElement('div');
        if (window.localStorage.getItem("achievement".concat(i + 1)) == "true") {
            htmlID.classList.add('ID');
            htmlID.textContent = `${achiev.ID}`;
        } else {
            htmlID.classList.add('cadenas');
            var img = document.createElement("img");
            img.src = "./img/ux_kit/Cadenas.svg";
            img.id = "image_cadenas";
            htmlID.appendChild(img);
        }


        let htmlName = document.createElement('h2');
        htmlName.classList.add('name');
        htmlName.textContent = achiev.name;

        let htmlDesc = document.createElement('p');
        htmlDesc.classList.add('shortDescription');
        htmlDesc.classList.add(`shortDescription-${achiev.ID}`);
        htmlDesc.textContent = achiev.shortDescription;

        let isOpen = false;

        htmlAchiev.addEventListener('click', function () {
            if (window.localStorage.getItem("achievement".concat(htmlAchiev.id)) == "true") {
                if (window.localStorage.getItem("achievement".concat(htmlAchiev.id))) {
                    let currentDescription = document.querySelector('.shortDescription');
                    if (currentDescription) {
                        currentDescription.remove();
                    }
                    if (isOpen) {
                        htmlDesc.remove();
                        isOpen = false;
                    } else {
                        htmlAchiev.appendChild(htmlDesc);
                        isOpen = true;
                    }
                }
            }
        });

        let htmlAchievVisible = document.createElement('div');
        htmlAchievVisible.setAttribute('id','visible');
        htmlAchievVisible.appendChild(htmlID);
        htmlAchievVisible.appendChild(htmlName);
        htmlAchiev.appendChild(htmlAchievVisible);
        result.appendChild(htmlAchiev);
        console.log(result);


    }


}

achievement();

function map() {
    window.location = "./map.html"
}