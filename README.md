This project is searching for repos in github.
</br>
It was part of a job interview
</br>

3rd party libraries and open sources I used for this:

</br>

[Create React App](https://github.com/facebook/create-react-app)

</br>

[node-sass](https://github.com/sass/node-sass)

</br>

[lodash](https://lodash.com/) - for debouncing search results, etc

</br>

[Select](https://github.com/JedWatson/react-select)

</br>

[undraw](https://undraw.co/illustrations) - no results SVG

</br>

[eact-router-dom](https://www.npmjs.com/package/react-router-dom)

</br>

[github api](https://developer.github.com/v3/search/)

</br>

[react-test-renderer](https://reactjs.org/docs/test-renderer.html) - for snapshot testing

</br>
redux and thunk
</br></br>

**Notes:**

I would ususally seperate compenents into sub folders by the container and sub components, for example:
</br>
* /Repos/
* /Repos/Repos.js
* /Repos/SeachBar.js
* /Repos/ReposList.js
  

and so on but skipped it for this project due to the size.
</br>
I added documentation and/or some notes inside the project
</br>
I added to search results (even faild ones) the time they were ended.. just seemed to be useful somehow in future..
</br>
Wouldve added with more time: integration test (state action reducers), containers tests and maybe some minor refactoring :)
