# 🚀 HIVE Database Migration Deployment Checklist

## Critical Schema Migration: Nested → Flat Structure

**Migration Date**: ________________  
**Migration Lead**: ________________  
**Backup Verified**: ________________

---

## 📋 Pre-Migration Checklist

### 1. Backup & Recovery (CRITICAL)
- [ ] **Export full Firestore backup** using `gcloud firestore export`
- [ ] **Verify backup is complete** and accessible
- [ ] **Document rollback procedure** in case of failure
- [ ] **Test restore process** on staging environment

### 2. Code Preparation
- [ ] **Merge all schema updates** to main branch
- [ ] **Build and test locally** with `pnpm build`
- [ ] **Run linting** with `pnpm lint`
- [ ] **Run type checking** with `pnpm typecheck`

### 3. Environment Verification
- [ ] **Staging environment tested** with new schema
- [ ] **Firebase Functions deployed** to staging
- [ ] **Security rules tested** in Firebase Console
- [ ] **API endpoints verified** with Postman/curl

---

## 🔄 Migration Execution Steps

### Phase 1: Deploy Code Updates
```bash
# 1. Deploy Firebase Functions with flat schema support
cd functions
npm run deploy

# 2. Deploy updated Firestore security rules
firebase deploy --only firestore:rules -P production

# 3. Deploy web application
vercel --prod
```

### Phase 2: Run Migration Script
```bash
# 1. Check current database state
cd firebase/scripts
npx ts-node check-database-status.ts

# 2. Run migration (DO NOT INTERRUPT)
npx ts-node migrate-to-flat-structure.ts

# 3. Verify migration success
npx ts-node test-flat-migration.ts
```

### Phase 3: Monitor & Verify
- [ ] **Monitor error logs** in Firebase Console
- [ ] **Check Vercel deployment** logs
- [ ] **Test critical user flows**:
  - [ ] User authentication
  - [ ] Join/leave space
  - [ ] Create post
  - [ ] View members
  - [ ] Create event

### Phase 4: Cleanup (After Verification)
```bash
# ONLY after 24-48 hours of stable operation
npx ts-node cleanup-nested-structure.ts
```

---

## ✅ Post-Migration Verification

### Data Integrity Checks
- [ ] **All spaces have categories** - Run: `test-flat-migration.ts`
- [ ] **Member counts accurate** - Verify in Firebase Console
- [ ] **Posts linked to spaces** - Check spacePosts collection
- [ ] **Events have space references** - Check spaceEvents collection
- [ ] **No nested structures remain** - Verify subcollections deleted

### Application Testing
- [ ] **Space listing page** loads correctly
- [ ] **Space detail pages** show all tabs
- [ ] **Member management** works
- [ ] **Post creation** functions
- [ ] **Event RSVP** operates
- [ ] **Search functionality** returns results

### Performance Metrics
- [ ] **Query performance** improved (target: <100ms)
- [ ] **Page load times** within budget (<3s)
- [ ] **No increase in errors** in monitoring

---

## 🚨 Rollback Procedure

If critical issues arise:

1. **Immediate Actions**:
   ```bash
   # Revert Firestore rules
   firebase deploy --only firestore:rules -P production --config firestore.old.rules
   
   # Rollback Functions
   firebase functions:delete --force
   git checkout main~1
   npm run deploy
   
   # Revert Vercel deployment
   vercel rollback
   ```

2. **Restore Database**:
   ```bash
   gcloud firestore import gs://[BACKUP_BUCKET]/[BACKUP_ID]
   ```

3. **Notify Team**:
   - [ ] Alert all developers
   - [ ] Update status page
   - [ ] Document issues encountered

---

## 📊 Success Criteria

Migration is considered successful when:

- ✅ All tests in `test-flat-migration.ts` pass
- ✅ Zero increase in error rate over 24 hours
- ✅ All critical user flows functional
- ✅ Query performance improved or maintained
- ✅ No data loss reported

---

## 🔍 Migration Statistics

Record final numbers:

| Metric | Before | After | Status |
|--------|--------|-------|--------|
| Total Spaces | | | |
| Total Members | | | |
| Total Posts | | | |
| Total Events | | | |
| Avg Query Time | | | |
| Error Rate | | | |

---

## 📝 Notes & Issues

Document any issues encountered:

```
Date/Time: 
Issue: 
Resolution: 
```

---

## 🎯 Sign-offs

- [ ] **Technical Lead**: ________________ Date: ________
- [ ] **Database Admin**: ________________ Date: ________
- [ ] **Product Owner**: ________________ Date: ________

---

**Remember**: 
- Take your time, don't rush
- Test thoroughly at each step
- Keep the team informed
- Have rollback ready at all times

**Support Contacts**:
- Firebase Support: https://firebase.google.com/support
- Vercel Support: https://vercel.com/support
- Team Slack: #hive-deployment