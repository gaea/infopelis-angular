customDirectives = angular.module('customDirectives', []);

customDirectives.directive('customPopover', function () {
    return {
        restrict: 'A',
        template: '<span>{{label}}</span>',
        link: function (scope, el, attrs) {
            scope.label = attrs.popoverLabel;
            $(el).popover({
                trigger: 'hover',
                html: true,
                content: attrs.popoverHtml,
                placement: attrs.popoverPlacement
            });
        }
    };
});

movieController.directive('search', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/search-directive.html'
  };
});