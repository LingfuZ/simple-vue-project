new Vue({
    el: '#app',
    data: {
        breed: {},
        breeds: [],
        selected_breed: {},
        images: [],
        current_image: {},
        width: '',
        height: ''
    },
    mounted() {
        this.getBreeds();
        this.getImages("abys");
    },
    methods: {
        async getBreeds()
        {
            try {
                axios.defaults.headers.common['x-api-key'] = "fd680846-74cf-41c1-9b76-6e0832eb6ef1"

                let response = await axios.get('https://api.thecatapi.com/v1/breeds/')
                this.breeds = response.data;
            } catch (e) {
                console.log('app_getBreeds_error: ' + e)
            }
        },
        async getImages(selected_breed) {
            try {
                let ratio = 0;
                let area = 0;
                if (this.width && this.height) {
                    ratio = this.width / this.height;
                    area = this.width * this.height;
                }
                let limit = 10
                let response = await axios.get('https://api.thecatapi.com/v1/images/search?breed_ids=' + selected_breed + '&limit=' + limit)

                // Add additional properties to image object in order to sort
                let unsorted_images = response.data
                let i = 0;
                for (i = 0; i < unsorted_images.length; i++) {
                    unsorted_images[i].desiredRatio = ratio;
                    unsorted_images[i].desiredArea = area;
                }

                // Sort images according to its ratio and area difference than user's input
                this.images = unsorted_images.sort(
                    function(a, b) {
                        if (a.desiredRatio && a.desiredArea) {
                            const a_ratio_diff = Math.abs((a.width / a.height) - a.desiredRatio);
                            const b_ratio_diff = Math.abs((b.width / b.height) - a.desiredRatio);
                            const a_area_diff = Math.abs((a.width * a.height) - a.desiredArea);
                            const b_area_diff = Math.abs((b.width * b.height) - a.desiredArea);

                            if (a_ratio_diff > b_ratio_diff) {
                                return 1;
                            }
                            if (a_ratio_diff < b_ratio_diff) {
                                return -1;
                            }

                            // break even conditions
                            if (a_ratio_diff == b_ratio_diff) {
                                if (a_area_diff > b_area_diff) {
                                    return 1;
                                }
                                if (a_area_diff < b_area_diff) {
                                    return -1;
                                }
                            }
                            return 0;
                        }
                    }
                )

                this.current_image = this.images[0]

            } catch (e) {
                console.log('app_getImages_error: ' + e)
            }
        }
    }
})