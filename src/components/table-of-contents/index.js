import React from 'react';
import { hashHistory } from 'react-router';

import { Placeholder, Card, Grid } from '..';

const Image = ({ src }) => src ? (
  <Placeholder src={src} ratio={1} width={0.4} />
) : null;

const Heading = ({ text }) => text ? (
  <h4>
    {text}
  </h4>
): null;

const Description = ({ text }) => text ? (
  <p>
    {text}
  </p>
): null;

const Information = ({ heading, description }) => heading || description ? (
  <aside>
    <Heading text={heading} />
    <Description text={description} />
  </aside>
) : null;

const Article = ({ article }) => (
  <Card onClick={article.article_pdf_index && article.article_pdf_index.length ? () => hashHistory.push(`/pdf/${ article.article_pdf_index[0]}`) : null} direction="row">
    <Image src={article.asset_thumbnail && article.asset_thumbnail.asset_path_signed ? article.asset_thumbnail.asset_path_signed : null} />
    <Information
      heading={article.$name}
      description={`Page ${article.article_startingPage}`}
    />
  </Card>
);

export default ({ issue }) => (
  <Grid>
    {issue.issue_article.map(article => (
      <Article article={article} />
    ))}
  </Grid>
);
