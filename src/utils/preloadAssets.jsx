const imageModules = import.meta.glob(
    "/src/assets/**/*.{png,jpg,jpeg,webp,svg,gif,avif}",
    {
        eager: true,
        import: "default"
    }
);

const fontModules = import.meta.glob(
    "/src/assets/**/*.{ttf,otf,woff,woff2}",
    {
        eager: true,
        import: "default"
    }
);

const imageUrls = Object.values(imageModules);
const fontUrls = Object.values(fontModules);

const preloadImage = (src) => {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = resolve;
        img.onerror = resolve;

        img.src = src;

        if (img.decode) {
            img.decode().then(resolve).catch(resolve);
        }
    });
};

const preloadFont = (src) => {
    return new Promise((resolve) => {
        const font = new FontFace("PreloadedFont", `url(${src})`);

        font.load()
            .then((loadedFont) => {
                document.fonts.add(loadedFont);
                resolve();
            })
            .catch(resolve);
    });
};

export function preloadAssets() {
    const imagePromises = imageUrls.map((src) => preloadImage(src));
    const fontPromises = fontUrls.map((src) => preloadFont(src));

    return Promise.all([...imagePromises, ...fontPromises]);
}