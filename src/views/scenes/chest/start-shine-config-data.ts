import StarShineConfig from "./star-shine-config";

const startShineConfigData: StarShineConfig[] = [
    {
        x: 90,
        y: 109,
        delay: 0,
    },
    {
        x: 125,
        y: 130,
        delay: 0,
    },
    {
        x: 14,
        y: 139,
        delay: 0,
    },
    {
        x: -100,
        y: 97,
        delay: 0,
    },
    {
        x: 68,
        y: -44,
        delay: 0,
    },
    {
        x: -5,
        y: -67,
        delay: 0,
    },
    {
        x: -6,
        y: 14,
        delay: 0,
    }
];

for (let data of startShineConfigData) {
    data.delay = 1000 * Math.random();
}

export default startShineConfigData;

