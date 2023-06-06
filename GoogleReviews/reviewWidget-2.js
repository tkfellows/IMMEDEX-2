function injectWidget(classId,mediaPath,postedReviews,totalReviews,googleReviewLink) {
    var widgetDiv = document.getElementsByClassName(classId)[0];
    var div = document.createElement('div');
    div.innerHTML = 
    `

    <!-- Google Logo section including review stars -->
    <section>
        <div id="review-header" style="background-color:rgba(255,255,255,0.5);" class="container-xl rounded-3 pe-5 py-3">
            <div class="row d-flex justify-content-between align-items-center">
                <div class="col-8 col-xs-2 col-med-4 col-lg-7">
                    <div class="container-fluid">
                        <!-- Heading -->
                        <row class="row justify-content-start">
                            <div class="col-12 col-xs-6" style="font-size:2vw;">
                                <img src="${mediaPath}/google-logo-9834.png", style="width:50%; max-width: 125px;">
                                <a class="review-count align-middle text-decoration-underline enable-button-pointers text-nowrap ps-1 pt-2" style="font-size: 0.65em;" href=${postedReviews}>${totalReviews}</a>
                            </div>
                        </row>
                        <row class="row justify-content-start">
                            <div class="col-lg-12 col-xs-6 ps-3">
                                <span class="review-average align-middle pe-1"  style="font-size: 3vw;">4.9</span>
                                <span>
                                    <img src="${mediaPath}/star-fill.svg" alt="1" class="review-star" style="width:10%; max-width: 25px;">
                                    <img src="${mediaPath}/star-fill.svg" alt="2" class="review-star" style="width:10%; max-width: 25px;">
                                    <img src="${mediaPath}/star-fill.svg" alt="3" class="review-star" style="width:10%; max-width: 25px;">
                                    <img src="${mediaPath}/star-fill.svg" alt="4" class="review-star" style="width:10%; max-width: 25px;">
                                    <img src="${mediaPath}/star-fill.svg" alt="5" class="review-star" style="width:10%; max-width: 25px;">
                                </span>
                            </div>
                        </row>
                    </div>

                </div>
                <div class="col-4 col-sm-3 col-md-3 col-lg-2 me-lg-5">
                    <div class="google-button">
                        <a href=${googleReviewLink} class="btn btn-success btn-sm" style="padding-top: 0px;">                     
                            <span class="text-nowrap " style="font-size: min(max(12px, 2vw), 18px); color: white">
                                <img src="${mediaPath}/pencil-square.svg" alt="pencil" class="review-icon me-1" style="filter:invert(1); width: 1.25em;">
                                Write a Review
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Carousel Section -->
    <section>
        <div style="background-color:rgba(255,255,255,0.5);" class="container-xl rounded-3 py-4">
            <div id="googleReviewCarousel" class="carousel slide" data-bs-ride="carousel">
                 <!-- Carousel indicators -->
                <ol class="carousel-indicators"></ol>

                <!-- Wrapper for carousel items -->
                <div class="carousel-inner"></div>

                
                <button class="carousel-control-prev" type="button" data-bs-target="#googleReviewCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>

                <button class="carousel-control-next" type="button" data-bs-target="#googleReviewCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
   
        </div>
    </section>
    `;
    widgetDiv.appendChild(div);
};

function appendCarouselIndicator(jsonData,carouselIndicatorClass) {
    var divInd = document.getElementsByClassName(carouselIndicatorClass)[0];
    for (let i = 0; i < jsonData.length; i++) {
        // Adding indicator 
        var divIndItem = document.createElement('button');
        divIndItem.setAttribute("type", "button");
        divIndItem.setAttribute("data-bs-target","#googleReviewCarousel"); 
        divIndItem.setAttribute("data-bs-slide-to",i);
        if ( i < 1 ) {
            divIndItem.setAttribute("class","active");
        }
        divIndItem.innerHTML = '';
        divInd.appendChild(divIndItem);

    }
};

function appendCarouselReview(jsonData,classContainerTag,mediaPath) {
    var reviewContainer = document.getElementsByClassName(classContainerTag)[0];
    for (let i = 0; i < jsonData.length; i++) {
        var commentText = '';
        // Checks if comment left
        if (jsonData[i].hasOwnProperty('comment')) {
            commentText +=  
            `
            <!-- Comments -->
            <div class="container-fluid">
                <div class="row pt-4">
                    <span class="col-12">${jsonData[i].comment}</span>
                </div>
            </div>
            `
        } else { commentText = ''}

        // Get Date of reviews
        var dateObj = new Date(jsonData[i].createTime);
        const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {year:  'numeric', month: 'long', day:   'numeric'});

        // Star rating based on JSON data element
        let ratingDict = {"FIVE": 5, "FOUR": 4, "THREE": 3, "TWO": 2, "ONE": 1}
        var starRating = '';
        for (let j = 0; j < 5; j++){
            if (j < ratingDict[jsonData[i].starRating]) {
                starRating += `<img src="${mediaPath}/star-fill.svg" alt="1" class="review-star" style="width:15%; max-width: 24px;">`;
            } else {
                starRating += `<img src="${mediaPath}/star-empty.svg" alt="1" class="review-star" style="width:15%; max-width: 24px;">`;
            }
        }

        // Making div element
        var div = document.createElement('div');
        div.setAttribute("alt",`Slide ${i+1}`);
        if ( i < 1 ) {
            div.setAttribute("class","carousel-item active");
        } else {
            div.setAttribute("class","carousel-item");
        }

        div.innerHTML = 
        `
        <!-- Review #${i+1} -->
        <div class="container-fluid">
            <div class="row justify-content-between align-items-center">
                <div class="col-6 col-sm-8 col-md-9 col-lg-10">
                    <div class="row align-items-end">
                        <div class="col-4 col-sm-3 col-md-2 col-lg-1">
                            <!-- Inset Photo URL:  -->
                            <img src=${jsonData[i].reviewer.profilePhotoUrl} style="width: min(max(50px, 5vw), 100px);">
                            
                        </div>
                        <div class="col-8 ps-sm-3 ps-md-4 ps-lg-5 ps-xl-5">
                            <div class="row">
                                <strong style="font-size: min(max(12px, 2.5vw), 18px);">
                                    <!-- Insert Name -->
                                    ${jsonData[i].reviewer.displayName.toUpperCase()}
                                </strong>
                                <span style="font-size: min(max(8px, 2vw), 14px);">
                                    <!-- Insert Date -->
                                    ${longEnUSFormatter.format(dateObj)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                    <!-- reviews -->
                    <div class="review-stars">
                        ${starRating}
                    </div>
                </div>
            </div>
            <!-- Comments -->
            <div class="container-fluid">
                <div class="row pt-4">
                    <span class="col-12">${commentText}</span>
                </div>
            </div>
        </div>
        `;
        reviewContainer.appendChild(div);
    }
}
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

document.addEventListener('DOMContentLoaded', function() {
    injectWidget("google-reviews", 
                "https://cdn.jsdelivr.net/gh/tkfellows/IMMEDEX-2/Media",
                "https://www.google.com/maps/place/IMMEDEX+GTA+Immigration+Medical+Exam+Centre/@43.763032,-79.2974992,17z/data=!3m1!5s0x89d4d1964d449d07:0x1459e3e90f838db3!4m7!3m6!1s0x89d4d33b7be4ab89:0xd10c7b3d546f6761!8m2!3d43.763032!4d-79.2953105!9m1!1b1",
                "31 Reviews",
                "https://g.page/r/CWFnb1Q9ewzREB0/review"
                );
    fetchReviews("https://cdn.jsdelivr.net/gh/tkfellows/IMMEDEX-2");
}, false);

function fetchReviews(jsonPath) {
    fetch(`${jsonPath}/GoogleReviews/immedexReviews.json`)
    .then(res => {
        if (res.ok) {
            console.log('Collected data from local API for adding item');
            return res.json();
        } else {
            console.log("Unable to collect data from local API ")
        }
    })// Need to convert res object to json
    .then(data => { 
        appendCarouselIndicator(data.reviews,"carousel-indicators");
        appendCarouselReview(data.reviews,"carousel-inner","https://cdn.jsdelivr.net/gh/tkfellows/IMMEDEX-2/Media");
    })
    .catch(error => console.log('ERROR'))
};
