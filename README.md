# granite-file-saver

> A lightweight element to save content to a file on the local filesystem
> 
> Polymer 1.5 ready


## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install LostInBrittany/granite-file-saver --save
```

Or [download as ZIP](https://github.com/LostInBrittany/granite-file-saver/archive/gh-pages.zip).## Usage

1. Import Web Components' polyfill (if needed):

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents.min.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/granite-file-saver/granite-file-saver.html">
    ```

3. Start using it!

    ```html
    <granite-file-saver content="A new file will be created with this content">
    <div class="clickHere">Click here to save a file</div>
    </granite-file-saver>
    ```


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)