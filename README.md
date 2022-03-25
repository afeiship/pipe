# generator-tailwind
> Yeoman generator for tailwind.

## installation
```shell
npm i classnames
npm i tailwind -D
```

## usage
```shell
# default path is: ./src/assets/styles
yo @jswork/tailwind --styles="./styles"
```

## .eslint
```js
{
  // ...
  "globals": {
    "window": true,
    "cx": true
  }
}
```

## global.d.ts
```ts
declare global {
  const cx: any;
}
```

## scripts
```json
{
  "tailwind:watch": "tailwindcss -i ./src/assets/styles/tailwind/src.css -o ./src/assets/styles/tailwind/dst.css --watch"
}
```
