module.exports = function(eleventyConfig){
    //copy
    //eleventyConfig.addPasthroughCopy (dir)
    eleventyConfig.addPassthroughCopy ("./src/SVG");
    eleventyConfig.addPassthroughCopy ("./src/fonts");
    eleventyConfig.addPassthroughCopy ("./src/script");
    eleventyConfig.addPassthroughCopy ("./src/img");
    //dirs
    return{
        dir:{
            input: "src",
            output: "public",
            includes: "_includes",
        },
    };
};