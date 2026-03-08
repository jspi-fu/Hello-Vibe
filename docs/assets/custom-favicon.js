document.addEventListener('DOMContentLoaded', function() {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    var path = window.location.pathname;
    var depth = (path.match(/\//g) || []).length - 1;
    var prefix = depth > 0 ? '../'.repeat(depth) : './';
    link.href = prefix + 'assets/favicon.svg';
    link.type = 'image/svg+xml';
});