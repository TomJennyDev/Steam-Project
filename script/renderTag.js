const gettagsId = (tagItem) => {
  const tagsName = tagItem.getAttribute("data-name");

  const paramsObject = {
    steamspy_tags: tagsName,
  };

  const isMatch = getParamsUrl()?.steamspy_tags === tagsName;

  const isDetailPage = window.location.pathname.includes("detail");

  if (isDetailPage) {
    let stringParams = `?steamspy_tags=${paramsObject.steamspy_tags}`;
    replaceUrlDocument(stringParams);
  } else if (isMatch) {
    setParamsToUrl({ name: "steamspy_tags", value: "" });
    setParamsToUrl({ name: "page", value: 1 });
    renderCategory();
  } else {
    const positioncategory = getEle(".category").offsetTop;

    getEle(".container .col:last-child").scrollTo({
      top: positioncategory,
      left: 0,
      behavior: "smooth",
    });
    const queryParams = {
      name: "steamspy_tags",
      value: paramsObject.steamspy_tags,
    };
    setParamsToUrl(queryParams);
    setParamsToUrl({ name: "page", value: 1 });
    getEle(".category").scrollTop = 0;
    renderCategory();
  }

  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  if (width < 415) {
    toggleFilter();
  }
};

const rendertagsList = async () => {
  try {
    let contenttagsList = "";
    const data = await getTagslist();
    console.log(data);
    data.forEach((tag) => {
      const tagsItem = `<li class="tag-item" data-name=${tag.name}  onclick="gettagsId(this)">
        <a  >${tag.name}</a>
       </li>`;

      contenttagsList += tagsItem;
    });

    getEle(".tags-menu").innerHTML = contenttagsList;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//active item tags
