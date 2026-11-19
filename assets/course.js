/* Shared behaviour: theme, disclaimer, top bar, lesson nav, progress, quizzes, reduced motion, glossary search.
   Load in <head> WITHOUT defer so the saved theme is applied before first paint. */
(function () {
  'use strict';
  var KEY = 'dep:v1:';
  function get(k) { try { return localStorage.getItem(KEY + k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(KEY + k, v); } catch (e) { /* private mode: no saving */ } }

  // Theme before paint.
  var savedTheme = get('theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  // Site root, worked out from this script's own URL (works on GitHub Pages sub-paths and file://).
  var ROOT = document.currentScript.src.replace(/assets\/course\.js(\?.*)?$/, '');

  /* COURSE MANIFEST — keep in sync with OUTLINE.md. built:true only when the page exists. */
  var MODULES = [
    { id: '00', slug: '00-foundations', title: 'Foundations', weight: 'Start here', lessons: [
      ['01', 'what-is-data-engineering', 'What is data engineering?', true],
      ['02', 'files-vs-tables', 'Files vs tables'],
      ['03', 'file-formats', 'File formats: CSV, JSON, Parquet, Avro, Delta, Iceberg'],
      ['04', 'batch-vs-streaming', 'Batch vs streaming'],
      ['05', 'what-is-spark', 'What is Apache Spark?'],
      ['06', 'dataframes-and-spark-sql', 'DataFrames and Spark SQL'],
      ['07', 'cloud-object-storage', 'Cloud object storage'],
      ['08', 'what-is-databricks', 'What is Databricks? Workspace and notebooks'],
      ['09', 'compute-clusters-serverless', 'Compute: clusters, SQL warehouses, serverless'],
      ['10', 'delta-lake-basics', 'Delta Lake basics'],
      ['11', 'unity-catalog-basics', 'Unity Catalog basics'],
      ['12', 'medallion-architecture', 'Medallion architecture']
    ]},
    { id: '01', slug: '01-developing-code', title: 'Developing Code for Data Processing (Python and SQL)', weight: '23%', lessons: [
      ['01', 'bundles-what-and-why', 'Declarative Automation Bundles: what and why'],
      ['02', 'bundles-project-structure', 'Structuring a modular Python bundle project'],
      ['03', 'libraries-pypi-wheels-archives', 'Installing libraries: PyPI, wheels, source archives'],
      ['04', 'troubleshooting-dependencies', 'Troubleshooting dependency conflicts'],
      ['05', 'python-and-sql-udfs', 'Python and SQL UDFs'],
      ['06', 'pandas-udfs', 'Pandas UDFs'],
      ['07', 'unity-catalog-functions', 'Unity Catalog functions'],
      ['08', 'lakeflow-pipelines-intro', 'Lakeflow pipelines: the declarative way'],
      ['09', 'auto-loader-in-pipelines', 'Streaming ingestion with Auto Loader in pipelines'],
      ['10', 'streaming-tables-vs-materialized-views', 'Streaming tables vs materialized views'],
      ['11', 'auto-cdc-scd-type-1', 'AUTO CDC and SCD Type 1'],
      ['12', 'auto-cdc-scd-type-2', 'AUTO CDC and SCD Type 2'],
      ['13', 'checkpoints-exactly-once', 'Checkpoints and exactly-once recovery'],
      ['14', 'output-modes-watermarks', 'Output modes and watermarks'],
      ['15', 'stateful-streaming-foreachbatch', 'Stateful streaming and foreachBatch'],
      ['16', 'structured-streaming-vs-declarative-pipelines', 'Structured Streaming vs Spark Declarative Pipelines'],
      ['17', 'lakeflow-jobs-ui', 'Lakeflow Jobs in the UI'],
      ['18', 'lakeflow-jobs-api-cli', 'Automating jobs with the API and CLI'],
      ['19', 'jobs-control-flow', 'Job control flow: If/else and For each'],
      ['20', 'serverless-environments', 'Serverless compute: environments and performance mode'],
      ['21', 'compute-configuration', 'Choosing compute: high memory, retries and auto-optimization'],
      ['22', 'unit-testing-dataframes', 'Unit tests with assertDataFrameEqual and assertSchemaEqual'],
      ['23', 'integration-testing', 'Integration tests and testable transforms']
    ]},
    { id: '02', slug: '02-data-ingestion', title: 'Data Ingestion and Acquisition', weight: '12%', lessons: [
      ['01', 'ingesting-file-formats', 'Reading every format: Delta, Parquet, JSON, Iceberg, CSV, binary'],
      ['02', 'auto-loader-cloud-storage', 'Auto Loader from cloud storage'],
      ['03', 'message-buses', 'Message buses: Kafka, Kinesis, Pub/Sub'],
      ['04', 'incremental-cdc-delta-iceberg', 'Incremental CDC into Delta or Iceberg targets'],
      ['05', 'lakeflow-connect-databases', 'Lakeflow Connect: CDC from SQL Server, MySQL, PostgreSQL'],
      ['06', 'opensharing', 'OpenSharing: Databricks-to-Databricks and open sharing'],
      ['07', 'clean-rooms', 'Clean Rooms'],
      ['08', 'lakehouse-federation', 'Lakehouse Federation']
    ]},
    { id: '03', slug: '03-data-manipulation', title: 'Data Manipulation', weight: '12%', lessons: [
      ['01', 'joins-at-scale', 'Joins at scale'],
      ['02', 'aggregations', 'Aggregations and grouping'],
      ['03', 'window-functions', 'Window functions'],
      ['04', 'variant-type', 'The VARIANT type and parse_json'],
      ['05', 'querying-variant', 'Querying VARIANT data: variant_get and paths'],
      ['06', 'ai-functions', 'AI functions and ai_query'],
      ['07', 'expectations', 'Expectations: warn, drop, fail'],
      ['08', 'quarantine-bad-records', 'Quarantining bad records']
    ]},
    { id: '04', slug: '04-monitoring-alerting', title: 'Monitoring and Alerting', weight: '10%', lessons: [
      ['01', 'system-tables-overview', 'System tables overview'],
      ['02', 'billing-cost-analysis', 'Cost analysis with billing tables'],
      ['03', 'audit-compute-lakeflow-tables', 'Audit, compute and Lakeflow system tables'],
      ['04', 'api-cli-sdk-monitoring', 'Monitoring with the REST API, CLI and SDK'],
      ['05', 'pipeline-event-log', 'The pipeline event log'],
      ['06', 'alerts-basics', 'Alerts: how they work'],
      ['07', 'alert-use-cases', 'What to alert on'],
      ['08', 'jobs-monitoring', 'Monitoring jobs in the UI and Jobs API']
    ]},
    { id: '05', slug: '05-cost-performance', title: 'Cost and Performance Optimization', weight: '15%', lessons: [
      ['01', 'managed-tables-predictive-optimization', 'Managed tables and predictive optimization'],
      ['02', 'liquid-clustering', 'Liquid clustering'],
      ['03', 'deletion-vectors', 'Deletion vectors'],
      ['04', 'cluster-by-auto', 'CLUSTER BY AUTO'],
      ['05', 'liquid-vs-partitioning-zorder', 'Liquid clustering vs partitioning and Z-ordering'],
      ['06', 'disk-cache', 'Caching repeated reads (disk cache)'],
      ['07', 'change-data-feed', 'Change data feed'],
      ['08', 'query-profile', 'Reading the query profile'],
      ['09', 'joins-shuffle-data-skipping', 'Join strategies, shuffles and data skipping']
    ]},
    { id: '06', slug: '06-security-compliance', title: 'Ensuring Data Security and Compliance', weight: '8%', lessons: [
      ['01', 'least-privilege-grants', 'Least-privilege grants on Unity Catalog objects'],
      ['02', 'workspace-permissions', 'Workspace resource permissions'],
      ['03', 'row-filters-column-masks', 'Row filters and column masks'],
      ['04', 'abac-governed-tags', 'ABAC policies with governed tags'],
      ['05', 'anonymization-techniques', 'Hashing, tokenization, suppression, generalization'],
      ['06', 'pii-compliant-pipeline', 'A PII-aware pipeline for batch and streaming'],
      ['07', 'data-purging-gdpr', 'Purging data for retention and right-to-erasure']
    ]},
    { id: '07', slug: '07-data-governance', title: 'Data Governance', weight: '5%', lessons: [
      ['01', 'tags-and-comments', 'Tags and comments for discoverability'],
      ['02', 'permission-inheritance', 'How permissions inherit']
    ]},
    { id: '08', slug: '08-debugging-deploying', title: 'Debugging and Deploying', weight: '10%', lessons: [
      ['01', 'spark-ui', 'Finding problems in the Spark UI'],
      ['02', 'logs-and-diagnostics', 'Cluster logs, system tables and query profiles for diagnosis'],
      ['03', 'repair-runs', 'Repairing failed runs with parameter overrides'],
      ['04', 'deploying-bundles', 'Deploying resources with bundles'],
      ['05', 'bundle-targets-ci-cd', 'Bundle targets and CI/CD'],
      ['06', 'git-folders', 'Git folders'],
      ['07', 'git-ci-cd-workflows', 'Git-based CI/CD workflows']
    ]},
    { id: '09', slug: '09-data-modeling', title: 'Data Modeling', weight: '5%', lessons: [
      ['01', 'table-layout-grain', 'Table layout: partitioning and data grain'],
      ['02', 'clustering-compaction', 'Clustering and balanced file sizes'],
      ['03', 'dimensional-modeling', 'Dimensional modeling: facts and dimensions'],
      ['04', 'materialized-views-aggregation', 'Materialized views for pre-computed aggregates'],
      ['05', 'metric-views', 'Unity Catalog metric views']
    ]}
  ];

  var LESSONS = [];
  MODULES.forEach(function (m) {
    m.lessons.forEach(function (l) {
      LESSONS.push({ id: m.id + '-' + l[0], title: l[2], built: !!l[3], module: m,
        href: ROOT + 'modules/' + m.slug + '/' + l[0] + '-' + l[1] + '.html' });
    });
  });

  var done = {};
  try { done = JSON.parse(get('done') || '{}') || {}; } catch (e) { done = {}; }
  function saveDone() { set('done', JSON.stringify(done)); }

  var DISCLAIMER = '<p><strong>Learning resource only.</strong> This is an independent, unofficial study guide made for learning purposes. ' +
    'It is not affiliated with, endorsed by or sponsored by Databricks. Databricks features change often, so always check the details in the ' +
    'official Databricks documentation (<a href="https://docs.databricks.com">https://docs.databricks.com</a>) and the official exam guide on ' +
    'databricks.com before relying on anything here. Databricks and related names are trademarks of their respective owners.</p>';

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  // Small helpers demos can use: Course.log(box, 'ok'|'bad'|'skip', text), Course.flash(node), Course.reduced.
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.Course = {
    reduced: reduced,
    log: function (box, cls, msg) { var s = el('span', cls); s.textContent = msg; box.appendChild(s); box.scrollTop = box.scrollHeight; },
    flash: function (n) { n.classList.remove('flash'); void n.offsetWidth; n.classList.add('flash'); }
  };

  function ready() {
    var body = document.body;

    // Disclaimer: pages hardcode it; inject if missing so it can never be left off.
    if (!document.querySelector('.disclaimer')) {
      var d = el('aside', 'disclaimer', DISCLAIMER); d.setAttribute('role', 'note'); d.setAttribute('aria-label', 'Disclaimer');
      body.insertBefore(d, body.firstChild);
    }

    // Top bar after the disclaimer.
    var bar = el('header', 'topbar',
      '<a class="brand" href="' + ROOT + 'index.html">DE Pro Study Course</a>' +
      '<nav aria-label="Site"><a href="' + ROOT + 'index.html#modules">Modules</a><a href="' + ROOT + 'glossary.html">Glossary</a>' +
      '<button type="button" class="theme-btn" aria-label="Switch colour theme"></button></nav>');
    var disc = document.querySelector('.disclaimer');
    disc.parentNode.insertBefore(bar, disc.nextSibling);
    var tb = bar.querySelector('.theme-btn');
    function isDark() {
      var t = document.documentElement.getAttribute('data-theme');
      return t ? t === 'dark' : !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    }
    function label() { tb.textContent = isDark() ? '☀ Light' : '☾ Dark'; }
    tb.onclick = function () { var t = isDark() ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', t); set('theme', t); label(); };
    label();

    // Reduced motion: CSS cannot stop SMIL, so remove it. Moving elements rest at data-rest="x,y" (SVG units).
    if (reduced) {
      document.querySelectorAll('animateMotion, animate, animateTransform').forEach(function (a) { a.parentNode.removeChild(a); });
      document.querySelectorAll('[data-rest]').forEach(function (e) { e.setAttribute('transform', 'translate(' + e.getAttribute('data-rest') + ')'); });
    }

    lessonNav();
    quizzes();
    home();
    glossary();
  }

  function lessonNav() {
    var id = document.body.getAttribute('data-lesson');
    var nav = document.getElementById('lesson-nav');
    if (!id || !nav) return;
    var i = LESSONS.findIndex(function (l) { return l.id === id; });
    if (i < 0) return;
    function link(l, dir) {
      if (!l) return '<span></span>';
      var txt = (dir < 0 ? '← ' : '') + l.id + ' ' + l.title + (dir > 0 ? ' →' : '');
      return l.built ? '<a href="' + l.href + '" rel="' + (dir < 0 ? 'prev' : 'next') + '">' + txt + '</a>'
                     : '<span class="btn" aria-disabled="true">' + txt + ' (coming soon)</span>';
    }
    nav.innerHTML = link(LESSONS[i - 1], -1) + '<button type="button" id="mark-done"></button>' + link(LESSONS[i + 1], 1);
    var b = document.getElementById('mark-done');
    function paint() { b.textContent = done[id] ? '✓ Completed' : 'Mark as complete'; b.classList.toggle('done', !!done[id]); b.setAttribute('aria-pressed', done[id] ? 'true' : 'false'); }
    b.onclick = function () { if (done[id]) delete done[id]; else done[id] = 1; saveDone(); paint(); };
    paint();
  }

  // Quiz markup: <div class="q" data-answer="N"> (0-based) with <ol class="opts"><li><button>…</button></li>…</ol><p class="why" hidden>…</p>
  function quizzes() {
    document.querySelectorAll('.quiz').forEach(function (quiz) {
      var qs = quiz.querySelectorAll('.q'), right = 0, answered = 0;
      var score = quiz.querySelector('.score') || quiz.appendChild(el('p', 'score'));
      score.setAttribute('aria-live', 'polite');
      qs.forEach(function (q) {
        var ans = +q.getAttribute('data-answer');
        var btns = q.querySelectorAll('.opts button');
        btns.forEach(function (btn, n) {
          btn.type = 'button';
          btn.onclick = function () {
            btns.forEach(function (x) { x.disabled = true; });
            btns[ans].classList.add('right');
            if (n !== ans) btn.classList.add('wrong'); else right++;
            answered++;
            var why = q.querySelector('.why'); if (why) why.hidden = false;
            score.textContent = 'Score: ' + right + ' / ' + qs.length + (answered === qs.length ? ' — done. Reload the page to try again.' : '');
          };
        });
      });
    });
  }

  function home() {
    var box = document.getElementById('module-cards');
    if (!box) return;
    var built = LESSONS.filter(function (l) { return l.built; }).length;
    var complete = LESSONS.filter(function (l) { return done[l.id]; }).length;
    var p = document.getElementById('progress-text');
    if (p) p.textContent = complete + ' of ' + LESSONS.length + ' lessons complete · ' + built + ' published so far';
    var bar = document.querySelector('.progress i');
    if (bar) bar.style.width = (100 * complete / LESSONS.length) + '%';
    var path = document.getElementById('learning-path');
    MODULES.forEach(function (m) {
      if (path) path.appendChild(el('li', null, '<a class="chip acc" href="#m' + m.id + '">' + m.id + ' ' + m.title.split(' (')[0] + '</a>'));
      var c = el('article', 'module'); c.id = 'm' + m.id;
      var n = m.lessons.length, d = 0;
      var items = LESSONS.filter(function (l) { return l.module === m; }).map(function (l) {
        if (done[l.id]) d++;
        return '<li class="' + (done[l.id] ? 'complete' : '') + '">' +
          (l.built ? '<a href="' + l.href + '">' + l.title + '</a>' : '<span class="soon">' + l.title + ' <span class="chip">soon</span></span>') + '</li>';
      }).join('');
      c.innerHTML = '<p class="eyebrow">Module ' + m.id + '</p><h3>' + m.title + '</h3>' +
        '<div class="meta"><span class="chip acc">Exam weight: ' + m.weight + '</span><span class="chip">' + d + ' / ' + n + ' done</span></div>' +
        '<ol>' + items + '</ol>';
      box.appendChild(c);
    });
  }

  function glossary() {
    var q = document.getElementById('gloss-search');
    if (!q) return;
    var dts = document.querySelectorAll('.gloss dt'), count = document.getElementById('gloss-count');
    function run() {
      var t = q.value.trim().toLowerCase(), shown = 0;
      dts.forEach(function (dt) {
        var dd = dt.nextElementSibling;
        var hit = !t || (dt.textContent + ' ' + dd.textContent).toLowerCase().indexOf(t) >= 0;
        dt.hidden = dd.hidden = !hit; if (hit) shown++;
      });
      count.textContent = shown + ' term' + (shown === 1 ? '' : 's');
    }
    q.addEventListener('input', run); run();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
})();
