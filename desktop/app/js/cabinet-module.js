var cabinetModule = (function () {

    var exportObj = {};

    var init = function () {
        _setupListeners();
        _setupChart();
        _setupPreview();
    };

    var _setupPreview = function () {
        PreviewImages('<div class="ovh max-block centriner">' +
            '<div class="centriner__item">' +
            '<img class="max-img" src="" alt=""/></div></div>', $('.j-preview-avatar'), 'replace-input');
    };

    var _setupListeners = function () {

    };

    var _setupChart = function () {

        var $container = $( '#chart-container' );

        $container.highcharts( {
            chart: {
                type: 'column',
                inverted: true
            },
            title: {
                text: ''
            },
            xAxis: {
                lineColor: '#000',
                type: 'category',
                tickColor: '#fff',
                labels: {
                    rotation: 0
                },
            },
            yAxis: {
                min: 0,
                lineColor: '#000',
                opposite: true,
                gridLineColor: '#000',
                gridLineWidth: 0,
                lineWidth: 1,
                tickLength: 10,
                tickWidth: 1,
                tickColor: '#000',
                tickInterval: 50000,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat( this.value, 0 );
                    }
                }

            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: ''
            },
            plotOptions: {
                series: {
                    pointWidth: 20
                }
            },
            series: [ {
                name: '',
                color: '#4682B4',
                data: [
                    [ 'vis', 430000 ],
                    [ 'util', 180000 ],
                    [ 'animate', 100000 ],
                    [ 'query', 90000 ],
                    [ 'analytics', 50000 ],
                    [ 'scale', 45000 ],
                    [ 'data', 43000 ],
                    [ 'physics', 40000 ],
                    [ 'display', 35000 ],
                    [ 'flex', 10000 ]
                ]
            } ],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            }
        } );

    };


    exportObj.init = init;

    return exportObj;

})();

