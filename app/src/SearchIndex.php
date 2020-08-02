<?php

namespace SilverstripeTemplateProject;

use Page;
use SilverStripe\Blog\Model\BlogPost;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\FullTextSearch\Solr\SolrIndex;

if (!class_exists(SolrIndex::class)) {
    return;
}

class SearchIndex extends SolrIndex {

    public function init()
    {
        $this->addClass(Page::class);
        $this->addClass(BlogPost::class);
        $this->addClass(SiteTree::class);

        $this->addAllFulltextFields();
        $this->addFulltextField('Content'); // only applies to Page class
        $this->addFulltextField('FirstName');
        $this->addFulltextField('Description');
        $this->addFulltextField('Categories');
        /** @see ElementalArea::getElementsForSearch */
        $this->addFulltextField('ElementsForSearch');

        // By default, we only add text fields that are 'visible' to users (where the content is directly visible on
        // the website), along with the 'meta' fields that are commonly used to boost / refine search results
        $this->addFulltextField('Title');
        $this->addFulltextField('MenuTitle');
        $this->addFulltextField('MetaDescription');
        $this->addFulltextField('ExtraMeta');

        // Adds 'ShowInSearch' boolean field to Solr document so we can later ensure that only documents included in
        // search are returned by Solr.
        $this->addFilterField('ShowInSearch');
    }
}
