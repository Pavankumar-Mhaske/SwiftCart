<div>
  {description && description.length > 70 ? (
    <p dangerouslySetInnerHTML={{ __html: description.substring(0, 68) + "..." }} />
  ) : (
    <p dangerouslySetInnerHTML={{ __html: description }} />
  )}
</div>