#!/bin/bash

echo "Fixing all logger.error and logger.warn patterns..."

# Counter for fixed files
fixed_count=0

# Fix pattern: logger.error('message', { error: ... })
# Should be: logger.error('message', error, { other props })

find apps/web/src/app/api -name "*.ts" -type f | while read file; do
  # Create a backup
  cp "$file" "$file.backup"

  # Use perl for complex multi-line replacements
  perl -i -pe '
    # Match logger.error with error in context object
    if (/logger\.error\(/) {
      $in_logger_error = 1;
      $logger_start = $_;
      $paren_count = tr/\(/\(/ - tr/\)/\)/;
    }
    elsif ($in_logger_error) {
      $logger_start .= $_;
      $paren_count += tr/\(/\(/ - tr/\)/\)/;

      if ($paren_count == 0) {
        # We have the complete logger.error call
        if ($logger_start =~ /logger\.error\(\s*(['"'"'"])([^'"'"'"]*)\1\s*,\s*\{\s*error:\s*(.*?),?\s*\n?\s*(.*?)\}\s*\)/s) {
          my $msg = $2;
          my $error_expr = $3;
          my $other_props = $4;

          # Clean up error expression
          $error_expr =~ s/\s+$//;
          $error_expr =~ s/,$//;

          # Clean up other props
          $other_props =~ s/^\s+//;
          $other_props =~ s/\s+$//;
          $other_props =~ s/,$//;

          if ($other_props) {
            $_ = "    logger.error(\n      '"'"'$msg'"'"',\n      $error_expr,\n      { $other_props }\n    )";
          } else {
            $_ = "    logger.error(\n      '"'"'$msg'"'"',\n      $error_expr\n    )";
          }
        }
        $in_logger_error = 0;
        $logger_start = "";
      }
    }
  ' "$file"

  # Check if file was actually changed
  if ! diff -q "$file" "$file.backup" > /dev/null 2>&1; then
    echo "Fixed: $file"
    ((fixed_count++))
    rm "$file.backup"
  else
    rm "$file.backup"
  fi
done

echo "Fixed $fixed_count files"
echo "Now fixing simpler patterns..."

# Fix the error.message patterns
find apps/web/src/app/api -name "*.ts" -type f -exec sed -i '' \
  's/error: error instanceof Error ? error\.message : '\''Unknown error'\''/errorMessage: error instanceof Error ? error.message : String(error)/g' {} \;

echo "Done!"