#!/bin/zsh
# Build the noindex preview into dist/ and deploy it to its Bluehost subdomain docroot.
# usage: scripts/deploy-preview.sh [subdomain=medspa]   (subdomain must exist: dir=public_html/<subdomain>-pentaservices)
set -e
sub=${1:-medspa}
cd "${0:A:h}/.."
rm -rf dist && mkdir dist
rsync -a --exclude='.git' --exclude='dist' --exclude='scripts' --exclude='docs' --exclude='README.md' --exclude='.gitignore' --exclude='.nojekyll' ./ dist/
cp scripts/htaccess-preview dist/.htaccess
printf 'User-agent: *\nDisallow: /\n' > dist/robots.txt
# feature guide PDF: https://<subdomain>.pentaservices.co.uk/pdf/Medspa-Clinic-Website-Guide.pdf
mkdir -p dist/pdf && for f in docs/*.pdf(N); do cp "$f" dist/pdf/; done
# every page: noindex meta + Penta Services credit bar
for f in dist/*.html; do
  perl -0pi -e 's#</head>#  <meta name="robots" content="noindex, nofollow">\n</head>#' "$f"
  perl -0pi -e 's#</body>#<div style="background:\#0b0b0b;color:\#bdbdbd;font:13px/1.6 system-ui,sans-serif;text-align:center;padding:12px 16px">Demo website by <a href="https://pentaservices.co.uk/?utm_source=demo-site&amp;utm_medium=footer-credit&amp;utm_campaign=medspa-clinic" target="_blank" rel="noopener" style="color:\#fff;font-weight:600">Penta Services</a> · fictional business, sample content</div>\n</body>#' "$f"
done
O=(-i ~/.ssh/bluehost_ed25519 -o IdentitiesOnly=yes)
rsync -az --delete --exclude='.well-known' --exclude='cgi-bin' -e "ssh ${O[*]}" dist/ "webadbiz@162.241.224.56:/home4/webadbiz/public_html/$sub-pentaservices/"
echo "deployed → https://$sub.pentaservices.co.uk/"
