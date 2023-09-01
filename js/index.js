const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json();
    const categoryDatas = data.data;
    // console.log(categoryDatas);

    const categoryButton = document.getElementById('category-btn');
    categoryDatas.forEach((categoryData) => {

        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        
            <button id="btn-btn" onclick="loadCategoryCard('${categoryData.category_id}')" class="btn btn-active w-28 hover:bg-[#FF1F3D] hover:text-white">
            ${categoryData?.category ? categoryData.category : 'no category'}
            </button>
        
        `
        categoryButton.appendChild(categoryDiv);


    });


}
// category card
const loadCategoryCard = async (id) => {


    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const cardDatas = data.data;

    const categoryCards = document.getElementById('category-cards');
    const categoryCards2 = document.getElementById('category-cards-2');
    categoryCards.textContent = '';
    categoryCards2.textContent = '';
    // conditional statement 
    if (cardDatas.length === 0) {
        const cardDiv = document.createElement('div');
        cardDiv.classList = `flex flex-col items-center justify-center mt-28 space-y-3`;
        cardDiv.innerHTML = `
            <img src="./images/icon.png" alt="">
            <p class="text-center text-4xl font-bold">Oops!! Sorry, There is no <br> content here</p>
        `;
        categoryCards2.appendChild(cardDiv);
       
    }
    else {

        cardDatas.sort((a, b) => {
            const aNumber = parseFloat(a.others.views) * 1000;
            const bNumber = parseFloat(b.others.views) * 1000;
            return bNumber - aNumber;
        });
        
        cardDatas.forEach((cardData) => {
            


            const cardDiv = document.createElement('div');
            cardDiv.classList = `card card-compact mt-10 bg-base-100 cursor-pointer p-1 transition ease-in-out delay-0 hover:translate-y-1  hover:scale-110 duration-300 hover:shadow-xl`;
            cardDiv.innerHTML = `
            
            <div class="relative">
                <img class="rounded-lg md:w-96 w-96 md:h-48 h-44 flex flex-col" src="${cardData?.thumbnail ? cardData.thumbnail : 'No ThumbNail'}" alt="image" />
                <p id="min-hours" class="absolute right-0 bottom-0 ${cardData?.others?.posted_date ? 'bg-[#171717]' : ''} rounded-md p-1 text-xs text-white m-2">
                ${cardData?.others?.posted_date ? convertSecsToHoursMins(cardData.others.posted_date) + ' ago' : ''}
              </p>
            </div>
    
            <div class="card-body mt-2">
                <div class="flex gap-2">
                    <img class="w-[40px] h-[40px] rounded-full" src="${cardData?.authors[0]?.profile_picture ? cardData.authors[0].profile_picture : 'No Picture'}" alt="">
                    <div class="">
                        <p class="font-bold">${cardData?.title ? cardData.title : 'No title'}</p>
                        <div class="mt-2 text-sm text-gray-500">
                            <p class="flex gap-2">${cardData?.authors[0]?.profile_name ? cardData.authors[0].profile_name : 'No Name'} <span>${cardData?.authors[0]?.verified ? '<img src="./images/fi_10629607.png" alt="">' : ''}</span></p>
                            <div class="mt-2">${cardData?.others?.views ? cardData.others.views : 'No Views'}</div>

                        </div>
                    </div>
                </div>
            </div>
            
            `
            categoryCards.appendChild(cardDiv);

        })

    }

    
}

// function hour to second conversion
const convertSecsToHoursMins = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let timeString = '';
    if (hours > 0) {
        timeString += `${hours}hrs `;
    }
    if (minutes > 0) {
        timeString += `${minutes}min `;
    }
    return timeString;
};

const sortByView = (sorting) =>{

    console.log('cliekd')

}

// const parseViewCount = (viewCount) => {
//     const [count, unit] = viewCount.trim().split(' ');

//     if (unit === 'K') {
//         return parseFloat(count) * 1000;
//     } else {
//         return parseFloat(count);
//     }
// };

const blog = () => {
    const newWindow = window.open('blog.html', '_blank');
}

loadCategoryCard('1000');
loadData();