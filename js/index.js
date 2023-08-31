const loadData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json();
    const categoryDatas = data.data;
    // console.log(categoryDatas);

    const categoryButton = document.getElementById('category-btn');
    categoryDatas.forEach((categoryData) => {

        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `
        
            <button onclick="loadCategoryCard('${categoryData.category_id}')" class="btn btn-active w-28 bg-[#FF1F3D] text-white">
            ${categoryData?.category}</button>
        
        `
        categoryButton.appendChild(categoryDiv);

    });


}

const loadCategoryCard = async (id) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const cardDatas = data.data;

    const categoryCards = document.getElementById('category-cards');
    categoryCards.textContent = '';
    cardDatas.forEach((cardData) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList = `card card-compact mt-10 bg-base-100`;
        cardDiv.innerHTML = `
        
        <img class="rounded-lg md:w-96 w-80 md:h-52 h-40 flex flex-col" src="${cardData?.thumbnail ? cardData.thumbnail : 'No ThumbNail'}" alt="image" />
        <div class="card-body">
            <div class="flex gap-2">
                <img class="w-[40px] h-[40px] rounded-full" src="${cardData?.authors[0]?.profile_picture ? cardData.authors[0].profile_picture : 'No Picture'}" alt="">
                <div class="">
                    <p class="font-bold">${cardData?.title ? cardData.title : 'No title'}</p>
                    <div class="mt-2 text-sm text-gray-500">
                        <p class="flex gap-2">${cardData?.authors[0]?.profile_name ? cardData.authors[0].profile_name : 'No Name'} <span>${cardData?.authors[0]?.verified ? '<img src="./images/fi_10629607.png" alt="">' : '' }</span></p>
                        <p class="mt-2">${cardData?.others?.views ? cardData.others.views + ' views' : 'No Views'}</p>
                    </div>
                </div>
            </div>
        </div>
        
        `
        categoryCards.appendChild(cardDiv);
    })


    console.log(cardDatas);
}
loadData();