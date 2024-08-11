document.addEventListener('DOMContentLoaded', () => {
    const discordBox = document.querySelector('.discord-box');
    const sideSection = document.querySelector('.side');
    const statement = document.querySelector('.statement');
    const examples = document.querySelector('.examples');
    const exampleBoxes = document.querySelectorAll('.examplebox');
    const bottomSection = document.querySelector('.bottom');
    const bottomBoxes = document.querySelectorAll('.technology, .contact');

    const originalDimensions = {
        discord: { width: discordBox.offsetWidth, height: discordBox.offsetHeight },
        side: { width: sideSection.offsetWidth, height: sideSection.offsetHeight },
        statement: { width: statement.offsetWidth, height: statement.offsetHeight },
        examples: { width: examples.offsetWidth, height: examples.offsetHeight },
        exampleBoxes: Array.from(exampleBoxes).map(box => ({ width: box.offsetWidth, height: box.offsetHeight })),
        bottom: { width: bottomSection.offsetWidth, height: bottomSection.offsetHeight },
        bottomBoxes: Array.from(bottomBoxes).map(box => ({ width: box.offsetWidth, height: box.offsetHeight }))
    };

    function scaleElements(discordScale) {
        const totalWidth = discordBox.parentElement.offsetWidth;
        const totalHeight = discordBox.parentElement.offsetHeight;

        // Scale Discord box
        const newDiscordWidth = originalDimensions.discord.width * discordScale;
        const newDiscordHeight = originalDimensions.discord.height * discordScale;
        discordBox.style.width = `${newDiscordWidth}px`;
        discordBox.style.height = `${newDiscordHeight}px`;

        // Scale side section
        const remainingWidth = totalWidth - newDiscordWidth;
        const sideScale = remainingWidth / originalDimensions.side.width;
        sideSection.style.width = `${remainingWidth}px`;

        // Scale statement and examples
        statement.style.height = `${originalDimensions.statement.height * sideScale}px`;
        examples.style.height = `${originalDimensions.examples.height * sideScale}px`;

        // Scale example boxes
        exampleBoxes.forEach((box, index) => {
            box.style.width = `${originalDimensions.exampleBoxes[index].width * sideScale}px`;
            box.style.height = `${originalDimensions.exampleBoxes[index].height * sideScale}px`;
        });

        // Scale bottom section
        const remainingHeight = totalHeight - newDiscordHeight;
        const bottomScale = remainingHeight / originalDimensions.bottom.height;
        bottomSection.style.height = `${remainingHeight}px`;

        // Scale bottom boxes
        bottomBoxes.forEach((box, index) => {
            box.style.width = `${originalDimensions.bottomBoxes[index].width * bottomScale}px`;
            box.style.height = `${originalDimensions.bottomBoxes[index].height * bottomScale}px`;
        });
    }

    discordBox.addEventListener('mouseenter', () => scaleElements(1.2));
    discordBox.addEventListener('mouseleave', () => scaleElements(1));
});