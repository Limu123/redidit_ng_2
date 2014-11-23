'use strict';

describe('Controller: MainCtrl', function () {

    var MainCtrl,
        scope,
        logMock,
        locationMock,
        RouteMock,
        PostdataMock,
        AuthMock,
        PromiseMock;

    var post, voteUp, voteDown;

    var user;

    // load the controller's module
    beforeEach(module('rediditApp'));

    beforeEach(function() {
        logMock = jasmine.createSpyObj('log', ['debug']);
        locationMock = jasmine.createSpyObj('location', ['path']);
        PostdataMock = jasmine.createSpyObj('Postdata', ['all', 'updateVotes', 'updateViews']);
        AuthMock = jasmine.createSpyObj('Auth', ['user']);
        RouteMock = jasmine.createSpyObj('$route', ['reload']);

        var f1 = function() {
          console.log('empty function called.')
        };

        PromiseMock = {};
        PromiseMock.then = function(f1) {};

        PostdataMock.deletePost = function(post) {
          return PromiseMock;
        };
        spyOn(PostdataMock, 'deletePost').andReturn(PromiseMock);

        post = {$id: 5, upvotes: 2, views: 7 };
        voteUp = {postId: 5, authorUID: 'tester1', vote: 1};
        voteDown = {postId: 5, authorUID: 'tester1', vote: -1};

        user = {
          username: 'tester',
          email: 'tester@redid.it',
          uid: 'tester1'
        };
        AuthMock.user = user;
        AuthMock.signedIn = function() {
          return true;
        };

        module(function($provide) {
          $provide.value('Postdata', PostdataMock);
          $provide.value('$location', locationMock);
          $provide.value('Auth', AuthMock);
          $provide.value('$route', RouteMock);
        });
    });

    describe('access data service', function() {

        it('should access postdata service', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope});
            var posts = c.posts;

            expect(PostdataMock.all).toHaveBeenCalled();
        }));

        it('should vote up', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope, Auth: AuthMock});
            scope.voteUpPost(post);

            expect(PostdataMock.updateVotes).toHaveBeenCalledWith(post, voteUp);
        }));

        it('should vote down', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope, Auth: AuthMock});
          scope.voteDownPost(post);

            expect(PostdataMock.updateVotes).toHaveBeenCalledWith(post, voteDown);
        }));

        it('should show details', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope});

            scope.showDetail(post);

            expect(PostdataMock.updateViews).toHaveBeenCalledWith(post);
            expect(post.views).toBe(8);
            expect(post.views).not.toBe(7);

            expect(locationMock.path).toHaveBeenCalled();
        }));

        it('should delete a post', inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            var c = $controller('MainCtrl', {$scope: scope});
            scope.deletePost(post);

            expect(PostdataMock.deletePost).toHaveBeenCalledWith(post);
            expect(post.views).toBe(7);
        }));
    });
});
