---
title: Blogging Like a Hacker
---

# Hello world!


What about posting some wierd stuff here?

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

