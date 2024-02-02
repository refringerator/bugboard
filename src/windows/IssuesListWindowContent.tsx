/* eslint-disable jsx-a11y/anchor-is-valid */
import { Issue, useGetPostsQuery } from 'src/service/issues';

function PostListItem({
  data: { name, id },
  onSelect,
}: {
  data: Issue;
  onSelect: (id: number) => void;
}) {
  return (
    <li>
      <a href="#" onClick={() => onSelect(id)}>
        {name}
      </a>
    </li>
  );
}
function IssuesListWindowContent() {
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!posts) {
    return <div>No issues :(</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostListItem
          key={post.id}
          data={post}
          onSelect={(id) => console.log(`/posts/${id}`)}
        />
      ))}
    </div>
  );
}

IssuesListWindowContent.windowId = 'IssuesListWindow';
IssuesListWindowContent.title = 'Issues list';

export default IssuesListWindowContent;
