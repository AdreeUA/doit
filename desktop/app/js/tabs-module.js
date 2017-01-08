var tabsModule = (function() {

    var exportObj = {};

    var $tabs = $('.tabs');

    exportObj.init = function() {

        if ($tabs.length) {
            $tabs.easytabs({
                tabs: '> .tabs__header .tabs__nav-item',
                panelActiveClass: 'tabs__panel_active'
            });

            $tabs.on('easytabs:after', function(e, $clicked, $targetPanel) {
                var $gallery = $targetPanel.find('.gallery');

                if ($gallery.length) {
                    $gallery.masonry('layout');
                }
            });

            $tabs.each(function() {
                var $this = $(this),
                    $activeTab = $this.find('.tabs__nav-link.active').eq(0),
                    $activePanel = $this.find($activeTab.attr('href'));

                $this.trigger('tabs:init', [$activeTab, $activePanel]);
            });
        }

        $(document).on('click', '.js-open-tab', function(e) {
            var $this = $(this),
                fullHref = $this.attr('href'),
                hashPos = fullHref.indexOf('#'),
                href = fullHref.slice(hashPos),
                $target = $(href),
                $tabs = $target.closest('.tabs');

            if ($tabs.length) {
                e.preventDefault();
                $tabs.easytabs('select', href);
            }
        });

    };

    return exportObj;

})();
