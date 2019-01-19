function getResult(url) {

    console.log('Fetching...');

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState !== 4 || xhttp.status != 200) return;
        let {
            items
        } = JSON.parse(xhttp.responseText);
        if (items.length === 0) {
            $('#items').empty();
            $('#items').innerHTML = "<p> No results are found...</p>"
        return;}
        items.map(addElement).map(ele => {
            $('#items').append(ele)
        })

    }
    xhttp.open('GET', url, true);
    xhttp.send();
}

function addElement(item) {
    let li = document.createElement('li');
    $(li).addClass('list-group-item');
    li.innerHTML =
        `
 <span class="badge badge-info"> Viewed ${item.view_count}</span>  <span class="badge badge-info"> Answered ${item.answer_count}</span>  <span class="badge badge-info"> Score ${item.score}</span><br/> ${item.title}
<br/>
<span style="float:left">
    ${item.owner.display_name} created it
</span>
<span style="float:right">
${item.tags.map(tag => { return '<span class="badge badge-secondary">' + tag + '</span>' }
        ).join(' ')}
</span>`;
    $(li).on('click', () => {
        window.open(item.link);
    })
    return li;
}
$(document).ready(() => {
    $('#popKey').on('click', 'input', () => {
        $('#popover').css('display', 'block')
    })
    $('#popKey').on('input', 'input', () => {
        $('#popover').css('display', 'block')
    })
    $('#search-click').on('click', () => {
        $('#popover').css('display', 'none')
        getResult(getUrl())
    });
    $("#keyword").keypress(function (e) {
        if (e.keyCode !== 13) return;
        $('#popover').css('display', 'none');
        getResult(getUrl())
    });
})

function getUrl() {
    let apiCall = 'https://api.stackexchange.com/2.2/search/advanced?'
    apiCall += $('#keyword').val() !== '' ? `title=${$('#keyword').val().replace(' ', '')}&` : ``;
    apiCall += $('#userId').val() !== '' ? `user=${$('#userId').val().replace(' ', '')}&` : ``;
    apiCall += $('#tags').val() !== '' ? `tagged=${$('#tags').val().replace(' ', ';')}&` : ``;
    apiCall += $('#views').val() !== '' ? `views=${$('#views').val().replace(' ', '')}&` : ``;
    apiCall += $('#answers').val() !== '' ? `answers=${$('#answers').val().replace(' ', '')}&` : ``;
    apiCall += $('#closed').val() !== '' ? `closed=${$('#closed').val().replace(' ', '')}&` : ``;
    apiCall += 'site=stackoverflow'
    return apiCall
}